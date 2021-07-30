import {
  ClosingAccount,
  newRebalancingTx,
  RecipientAccounts,
} from '../problems/ThirdProblem';

it('test third problem, case #1: Invalid transaction', () => {
  // Given
  const acc: ClosingAccount = {accountId: 'acc', amount: -1};
  const rec: RecipientAccounts = {accountId: 'rec', credit: 500};

  // When
  const t = () => {
    newRebalancingTx([acc], [rec]);
  };

  // Then
  expect(t).toThrow(Error);
  expect(t).toThrow('Invalid transaction');
});

it('test third problem - Invalid transaction, case #1', () => {
  // Given
  const acc: ClosingAccount = {accountId: 'acc', amount: -1};
  const rec: RecipientAccounts = {accountId: 'rec', credit: 500};

  // When
  const t = () => {
    newRebalancingTx([acc], [rec]);
  };

  // Then
  expect(t).toThrow('Invalid transaction');
});

it('test third problem - Not enough funds, case #1', () => {
  // Given
  const acc: ClosingAccount = {accountId: 'acc', amount: 200};
  const rec: RecipientAccounts = {accountId: 'rec', credit: 500};

  // When
  const t = () => {
    newRebalancingTx([acc], [rec]);
  };

  // Then
  expect(t).toThrow('Not enough funds for rebalance');
});

it('test third problem - Not enough funds, case #2', () => {
  // Given
  const acc1: ClosingAccount = {accountId: 'acc1', amount: 500};
  const acc2: ClosingAccount = {accountId: 'acc2', amount: 400};
  const rec1: RecipientAccounts = {accountId: 'rec1', credit: 500};
  const rec2: RecipientAccounts = {accountId: 'rec2', credit: 400};

  // When
  const t = () => {
    newRebalancingTx([acc1, acc2], [rec1, rec2]);
  };

  // Then
  expect(t).toThrow('Not enough funds for rebalance');
});

it('test third problem - Successfully, case #1', () => {
  // Given
  const acc1: ClosingAccount = {accountId: 'acc1', amount: 500};
  const acc2: ClosingAccount = {accountId: 'acc2', amount: 420};
  const rec1: RecipientAccounts = {accountId: 'rec1', credit: 500};
  const rec2: RecipientAccounts = {accountId: 'rec2', credit: 400};

  // When
  const result = newRebalancingTx([acc1, acc2], [rec1, rec2]);

  // Then
  expect(result).toStrictEqual({
    transfers: [
      ['acc1', 'rec1', 500],
      ['acc2', 'rec2', 400],
    ],
    operationalFee: 20,
  });
});

it('test third problem - Successfully, case #2', () => {
  // Given
  const acc1: ClosingAccount = {accountId: 'acc1', amount: 500};
  const acc2: ClosingAccount = {accountId: 'acc2', amount: 500};
  const rec1: RecipientAccounts = {accountId: 'rec1', credit: 400};

  // When
  const result = newRebalancingTx([acc1, acc2], [rec1]);

  // Then
  expect(result).toStrictEqual({
    transfers: [
      ['acc1', 'rec1', 400],
      ['acc1', null, 100],
      ['acc2', null, 470],
    ],
    operationalFee: 30,
  });
});

it('test third problem - Successfully, case #3', () => {
  // Given
  const acc1: ClosingAccount = {accountId: 'acc1', amount: 500};
  const acc2: ClosingAccount = {accountId: 'acc2', amount: 5};
  const acc3: ClosingAccount = {accountId: 'acc3', amount: 5};

  const rec1: RecipientAccounts = {accountId: 'rec1', credit: 400};

  // When
  const result = newRebalancingTx([acc1, acc2, acc3], [rec1]);

  // Then
  expect(result).toStrictEqual({
    operationalFee: 20,
    transfers: [
      ['acc1', 'rec1', 400],
      ['acc1', null, 90],
    ],
  });
});
