
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';

import { produtos as localProducts } from '@/src/data/produtos';
import { listarProdutos } from '@/src/services/productService';
import type { Product } from '@/src/types/Product';

interface ProductsContextData {
  products: Product[];
  loading: boolean;
  getProductById: (id: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductsContext = createContext<
  ProductsContextData | undefined
>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

export function ProductsProvider({
  children,
}: ProductsProviderProps) {
  const [products, setProducts] = useState<Product[]>(
    localProducts,
  );
  const [loading, setLoading] = useState(true);

  const refreshProducts = useCallback(async () => {
    setLoading(true);

    try {
      const result = await listarProdutos();
      setProducts(result);
    } catch (error) {
      console.warn('Erro ao carregar produtos:', error);
      setProducts(localProducts);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void refreshProducts();
  }, [refreshProducts]);

  const getProductById = useCallback(
    (id: string) => products.find((product) => product.id === id),
    [products],
  );

  const value = useMemo(
    () => ({
      products,
      loading,
      getProductById,
      refreshProducts,
    }),
    [products, loading, getProductById, refreshProducts],
  );

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const context = useContext(ProductsContext);

  if (!context) {
    throw new Error(
      'useProducts deve ser utilizado dentro de ProductsProvider',
    );
  }

  return context;
}
