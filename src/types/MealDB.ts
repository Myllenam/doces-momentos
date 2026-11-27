
export interface MealDBDessert {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
}

export interface MealDBDessertsResponse {
  meals: MealDBDessert[] | null;
}
