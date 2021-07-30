import {
  Allergen,
  hasAllergens,
  Ingredient,
  Recipe,
  FoodType,
  hasFoodTypes,
  removeAllergens,
  removeFoodTypes,
  removeIngredients,
  doubleIngredients,
  getCalories,
} from '../problems/SecondProblem';

const FIRST_INGREDIENT: Ingredient = {
  name: 'Pizza sauce',
  amount: 100,
  caloriesPerUnit: 20,
};
const SECOND_INGREDIENT: Ingredient = {
  name: 'mozzarella',
  amount: 20,
  caloriesPerUnit: 50,
};

const RECIPE: Recipe = {
  name: 'test recipe',
  ingredients: [],
  foodTypes: [],
  allergens: [],
};

it('test hasAllergens, case #1', () => {
  // Given
  const recipe: Recipe = {...RECIPE, allergens: ['celery', 'milk']};
  const allergens: Allergen[] = ['fish', 'mustard'];

  // When
  const result = hasAllergens(recipe, allergens);

  // Then
  expect(result).toBe(false);
});

it('test hasAllergens, case #2', () => {
  // Given
  const recipe: Recipe = {...RECIPE, allergens: ['celery', 'milk']};
  const allergens: Allergen[] = ['milk', 'mustard'];

  // When
  const result = hasAllergens(recipe, allergens);

  // Then
  expect(result).toBe(true);
});

it('test hasFoodTypes, case #1', () => {
  // Given
  const recipe: Recipe = {
    ...RECIPE,
    foodTypes: ['Vegetables', 'Meat and Poultry'],
  };
  const foodTypes: FoodType[] = ['Fruits', 'Fish and Seafood'];

  // When
  const result = hasFoodTypes(recipe, foodTypes);

  // Then
  expect(result).toBe(false);
});

it('test hasFoodTypes, case #2', () => {
  // Given
  const recipe: Recipe = {
    ...RECIPE,
    foodTypes: ['Vegetables', 'Meat and Poultry'],
  };
  const foodTypes: FoodType[] = ['Grains, Beans and Nuts', 'Vegetables'];

  // When
  const result = hasFoodTypes(recipe, foodTypes);

  // Then
  expect(result).toBe(true);
});

it('test removeAllergens, case #1', () => {
  // Given
  const recipe: Recipe = {...RECIPE, allergens: ['celery', 'milk']};

  // When
  const result = removeAllergens(recipe, ['milk']);

  // Then
  expect(result.allergens).toStrictEqual(['celery']);
});

it('test removeAllergens, case #2', () => {
  // Given
  const recipe: Recipe = {...RECIPE, allergens: ['celery', 'milk']};

  // When
  const result = removeAllergens(recipe, ['peanuts']);

  // Then
  expect(result.allergens).toStrictEqual(['celery', 'milk']);
});

it('test removeFoodTypes, case #1', () => {
  // Given
  const recipe: Recipe = {
    ...RECIPE,
    foodTypes: ['Vegetables', 'Meat and Poultry'],
  };

  // When
  const result = removeFoodTypes(recipe, ['Vegetables']);

  // Then
  expect(result.foodTypes).toStrictEqual(['Meat and Poultry']);
});

it('test removeFoodTypes, case #2', () => {
  // Given
  const recipe: Recipe = {
    ...RECIPE,
    foodTypes: ['Vegetables', 'Meat and Poultry'],
  };

  // When
  const result = removeFoodTypes(recipe, ['Dairy Foods']);

  // Then
  expect(result.foodTypes).toStrictEqual(['Vegetables', 'Meat and Poultry']);
});

it('test removeIngredients, case #1', () => {
  // Given
  const recipe = {
    ...RECIPE,
    ingredients: [FIRST_INGREDIENT, SECOND_INGREDIENT],
  };

  // When
  const result = removeIngredients(recipe, [FIRST_INGREDIENT]);

  // Then
  expect(result.ingredients).toStrictEqual([SECOND_INGREDIENT]);
});

it('test removeIngredients, case #2', () => {
  // Given
  const recipe = {
    ...RECIPE,
    ingredients: [FIRST_INGREDIENT, SECOND_INGREDIENT],
  };

  // When
  const result = removeIngredients(recipe, []);

  // Then
  expect(result.ingredients).toStrictEqual([
    FIRST_INGREDIENT,
    SECOND_INGREDIENT,
  ]);
});

it('test doubleIngredients, case #1', () => {
  // Given
  const firstIngredientAmout = 20;
  const firstIngredient: Ingredient = {
    ...FIRST_INGREDIENT,
    amount: firstIngredientAmout,
  };
  const recipe = {
    ...RECIPE,
    ingredients: [firstIngredient, SECOND_INGREDIENT],
  };

  // When
  const result = doubleIngredients(recipe, [firstIngredient]);

  // Then
  expect(result.ingredients[0].amount).toBe(firstIngredientAmout * 2);
});

it('test doubleIngredients, case #2', () => {
  // Given
  const firstIngredientAmout = 20;
  const firstIngredient: Ingredient = {
    ...FIRST_INGREDIENT,
    amount: firstIngredientAmout,
  };
  const recipe = {
    ...RECIPE,
    ingredients: [firstIngredient, SECOND_INGREDIENT],
  };

  // When
  const result = doubleIngredients(recipe, [SECOND_INGREDIENT]);

  // Then
  expect(result.ingredients[0].amount).toBe(firstIngredientAmout);
});

it('test getCalories, case #1', () => {
  // Given
  const firstIngredientAmout = 20;
  const firstIngredientCaloriesPerUnit = 80;
  const firstIngredient: Ingredient = {
    ...FIRST_INGREDIENT,
    amount: firstIngredientAmout,
    caloriesPerUnit: firstIngredientCaloriesPerUnit,
  };

  const secondIngredientAmout = 50;
  const secondIngredientCaloriesPerUnit = 10;
  const secondIngredient: Ingredient = {
    ...SECOND_INGREDIENT,
    amount: secondIngredientAmout,
    caloriesPerUnit: secondIngredientCaloriesPerUnit,
  };

  const recipe = {
    ...RECIPE,
    ingredients: [firstIngredient, secondIngredient],
  };

  // When
  const result = getCalories(recipe);

  // Then
  expect(result).toBe(
    firstIngredientAmout * firstIngredientCaloriesPerUnit +
      secondIngredientAmout * secondIngredientCaloriesPerUnit,
  );
});
