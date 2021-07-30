import permutations from '../problems/FirstProblem';

it('test first problem, case #1', () => {
  // Given
  const input = '*1';
  const expected = ['01', '11'];

  // When
  const result = permutations(input);

  // Then
  expect(result).toStrictEqual(expected);
});

it('test first problem, case #2', () => {
  // Given
  const input = '**11';
  const expected = ['0011', '1011', '0111', '1111'];

  // When
  const result = permutations(input);

  // Then
  expect(result).toStrictEqual(expected);
});

it('test first problem, case #3', () => {
  // Given
  const input = '11111';
  const expected = ['11111'];

  // When
  const result = permutations(input);

  // Then
  expect(result).toStrictEqual(expected);
});
