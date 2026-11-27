
import type { MealDBDessert } from '@/src/types/MealDB';
import type { Product, ProductCategory } from '@/src/types/Product';

function getCategory(name: string): ProductCategory {
  const normalized = name.toLowerCase();

  if (normalized.includes('brownie')) {
    return 'Brownies';
  }

  if (
    normalized.includes('cake') ||
    normalized.includes('cheesecake')
  ) {
    return 'Bolos';
  }

  return 'Outros';
}

export function adaptMealToProduct(meal: MealDBDessert): Product {
  return {
    id: `meal-${meal.idMeal}`,
    nome: meal.strMeal,
    descricao: `Sobremesa especial: ${meal.strMeal}.`,
    preco: 14.9,
    categoria: getCategory(meal.strMeal),
    emoji: '🍰',
    imagem: meal.strMealThumb
      ? { uri: meal.strMealThumb }
      : undefined,
  };
}
