
import { adaptMealToProduct } from '@/src/adapters/productAdapter';
import { produtos } from '@/src/data/produtos';
import type { MealDBDessertsResponse } from '@/src/types/MealDB';
import type { Product } from '@/src/types/Product';

const API_URL =
  'https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert';

const REQUEST_TIMEOUT = 8000;
const MAX_EXTERNAL_PRODUCTS = 12;

export async function listarProdutos(): Promise<Product[]> {
  try {
    const response = await fetch(API_URL, {
      signal: AbortSignal.timeout(REQUEST_TIMEOUT),
    });

    if (!response.ok) {
      throw new Error(`Erro HTTP: ${response.status}`);
    }

    const data: MealDBDessertsResponse = await response.json();

    if (!Array.isArray(data.meals)) {
      throw new Error('Resposta inválida da API');
    }

    const externalProducts = data.meals
      .filter(
        (meal) =>
          typeof meal.idMeal === 'string' &&
          typeof meal.strMeal === 'string' &&
          meal.strMeal.trim().length > 0 &&
          typeof meal.strMealThumb === 'string',
      )
      .slice(0, MAX_EXTERNAL_PRODUCTS)
      .map(adaptMealToProduct);

    return [...produtos, ...externalProducts];
  } catch (error) {
    console.warn(
      'Não foi possível carregar a API. Usando catálogo local.',
      error,
    );

    return produtos;
  }
}
