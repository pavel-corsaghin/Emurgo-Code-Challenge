export type Allergen =
  | 'celery'
  | 'eggs'
  | 'fish'
  | 'lupin'
  | 'milk'
  | 'molluscs'
  | 'mustard'
  | 'peanuts'
  | 'sesame'
  | 'soybeans';

export type FoodType =
  | 'Vegetables'
  | 'Fruits'
  | 'Grains, Beans and Nuts'
  | 'Meat and Poultry'
  | 'Fish and Seafood'
  | 'Dairy Foods';

export interface Ingredient {
  name: String;
  amount: number;
  caloriesPerUnit: number;
}

export interface Recipe {
  name: String;
  ingredients: Ingredient[];
  foodTypes: FoodType[];
  allergens: Allergen[];
}

export const hasAllergens = (recipe: Recipe, allergens: Allergen[]) => {
  return recipe.allergens.some(item => allergens.includes(item));
};

export const hasFoodTypes = (recipe: Recipe, foodTypes: FoodType[]) => {
  return recipe.foodTypes.some(item => foodTypes.includes(item));
};

export const removeAllergens = (recipe: Recipe, allergens: Allergen[]) => {
  return {
    ...recipe,
    allergens: recipe.allergens.filter(item => !allergens.includes(item)),
  };
};

export const removeFoodTypes = (recipe: Recipe, foodTypes: FoodType[]) => {
  return {
    ...recipe,
    foodTypes: recipe.foodTypes.filter(item => !foodTypes.includes(item)),
  };
};

export const removeIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[],
) => {
  const ingredientNames = ingredients.map(item => item.name);
  return {
    ...recipe,
    ingredients: recipe.ingredients.filter(
      item => !ingredientNames.includes(item.name),
    ),
  };
};

export const doubleIngredients = (
  recipe: Recipe,
  ingredients: Ingredient[],
) => {
  const ingredientNames = ingredients.map(item => item.name);
  return {
    ...recipe,
    ingredients: recipe.ingredients.map(item =>
      ingredientNames.includes(item.name)
        ? {...item, amount: item.amount * 2}
        : item,
    ),
  };
};

export const getCalories = (recipe: Recipe) => {
  return recipe.ingredients.reduce(
    (acc, value) => acc + value.amount * value.caloriesPerUnit,
    0,
  );
};
