// This function helps to add a character to all elements of string array
// It use map function loops through every object in the array, having a complexity of O(n).
const addCharToArrayElements = (inputArray: String[], char: String) => {
  if (inputArray.length === 0) {
    return [char];
  }

  return inputArray.map(item => `${item}${char}`);
};

// This function will return string array as requirement.
// Main logic handle of function had a for loop (O(n)) that contain addCharToArrayElements (O(n)) so the complexity is O(n^2)
const permutations = (input: String) => {
  let result: String[] = [];

  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char === '*') {
      result = [
        ...addCharToArrayElements(result, '0'),
        ...addCharToArrayElements(result, '1'),
      ];
    } else {
      result = addCharToArrayElements(result, char);
    }
  }
  return result;
};

export default permutations;
