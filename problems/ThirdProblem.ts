export interface Account {
  accountId?: String;
}

export interface ClosingAccount extends Account {
  amount: number;
}

export interface RecipientAccounts extends Account {
  credit: number;
}

export const newRebalancingTx = (
  closingAccounts: ClosingAccount[],
  recipientAccounts: RecipientAccounts[],
) => {
  // A transfer cannot have a zero or negative value, such transaction will not be accepted and will cause an error.
  if (
    closingAccounts.some(item => item.amount <= 0) ||
    recipientAccounts.some(item => item.credit <= 0)
  ) {
    throw new Error('Invalid transaction');
  }

  const totalClosingAmount = closingAccounts.reduce(
    (acc, value) => acc + value.amount,
    0,
  );
  const totalRecipientAmount = recipientAccounts.reduce(
    (acc, value) => acc + value.credit,
    0,
  );

  // If there are not enough money in total in all closed accounts to fulfill total credit in recipients
  // - an error must be raised: “not enough funds for rebalance“.
  if (totalClosingAmount <= totalRecipientAmount) {
    throw new Error('Not enough funds for rebalance');
  }

  let transfers: any[] = [];
  let currentClosingAccountIndex = 0;
  let currentRecipientAccountIndex = 0;

  let currentClosingAccount = closingAccounts[currentClosingAccountIndex];
  let currentRecipientAccount = recipientAccounts[currentRecipientAccountIndex];

  while (currentClosingAccount && currentRecipientAccount) {
    const amount = currentClosingAccount.amount;
    const credit = currentRecipientAccount.credit;
    const transferAmount = Math.min(amount, credit);

    transfers = [
      ...transfers,
      [
        currentClosingAccount.accountId,
        currentRecipientAccount.accountId,
        transferAmount,
      ],
    ];

    if (transferAmount === amount) {
      currentClosingAccountIndex++;
      currentClosingAccount = closingAccounts[currentClosingAccountIndex];
    } else {
      currentClosingAccount = {
        ...currentClosingAccount,
        amount: amount - transferAmount,
      };
    }

    if (transferAmount === credit) {
      currentRecipientAccountIndex++;
      currentRecipientAccount = recipientAccounts[currentRecipientAccountIndex];
    } else {
      currentRecipientAccount = {
        ...currentRecipientAccount,
        credit: credit - transferAmount,
      };
    }
  }

  const currentNumberOfTransfers = transfers.length;

  // If totalClosingAmount less than sum of totalRecipientAmount and fee => throw not enough funds error
  if (
    totalClosingAmount <
    totalRecipientAmount + currentNumberOfTransfers * 10
  ) {
    throw new Error('Not enough funds for rebalance');
  }

  // If totalClosingAmount greater than sum of totalRecipientAmount and fee => there are will be addition transfers
  if (
    totalClosingAmount >
    totalRecipientAmount + currentNumberOfTransfers * 10
  ) {
    // Subtract fee from remainder amount
    const remainderClosingAccounts = [
      ...[currentClosingAccount],
      ...closingAccounts.slice(currentClosingAccountIndex + 1, undefined),
    ];

    // Here we need to create addition transfers for remainderClosingAccounts and also consider about fee subtraction
    // So the number of addition transfers will be between 1 and remainderClosingAccounts's lenght
    let numberOfAdditionTransfers = remainderClosingAccounts.length;
    let totalFee = (currentNumberOfTransfers + numberOfAdditionTransfers) * 10;
    let lastClosingAccountRemainAmount = 0;
    let sum = 0;
    for (let i = remainderClosingAccounts.length - 1; i >= 0; i--) {
      sum = sum + remainderClosingAccounts[i]!!.amount;
      if (sum > totalFee) {
        lastClosingAccountRemainAmount = sum - totalFee;
        break;
      }
      numberOfAdditionTransfers--;
      totalFee = (currentNumberOfTransfers + numberOfAdditionTransfers) * 10;
    }

    if (numberOfAdditionTransfers < 1) {
      throw new Error('not enough funds for rebalance');
    }

    // Add transfers to newly created recipient account with accountId equal null
    for (let i = 0; i < numberOfAdditionTransfers; i++) {
      const isLast = i === numberOfAdditionTransfers - 1;
      transfers = [
        ...transfers,
        [
          remainderClosingAccounts[i]!!.accountId,
          null,
          isLast
            ? lastClosingAccountRemainAmount
            : remainderClosingAccounts[i]!!.amount,
        ],
      ];
    }
  }

  return {
    transfers: transfers,
    operationalFee: transfers.length * 10,
  };
};
