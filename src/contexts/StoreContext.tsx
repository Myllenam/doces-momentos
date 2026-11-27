import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type PropsWithChildren,
} from 'react';

const CART_STORAGE_KEY = '@doces-momentos/cart';
const FAVORITES_STORAGE_KEY = '@doces-momentos/favorites';

type CartItem = { productId: string; quantity: number };

interface StoreContextValue {
  cart: CartItem[];
  favoriteIds: string[];
  isReady: boolean;
  cartCount: number;
  addToCart: (productId: string, quantity?: number) => void;
  updateCartQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  toggleFavorite: (productId: string) => void;
  isFavorite: (productId: string) => boolean;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: PropsWithChildren) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favoriteIds, setFavoriteIds] = useState<string[]>([]);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    let active = true;

    const loadStore = async () => {
      try {
        const [storedCart, storedFavorites] = await Promise.all([
          AsyncStorage.getItem(CART_STORAGE_KEY),
          AsyncStorage.getItem(FAVORITES_STORAGE_KEY),
        ]);

        if (!active) return;

        if (storedCart) {
          const parsedCart: unknown = JSON.parse(storedCart);
          if (Array.isArray(parsedCart)) {
            setCart(
              parsedCart.filter(
                (item): item is CartItem =>
                  typeof item?.productId === 'string' &&
                  Number.isInteger(item?.quantity) &&
                  item.quantity > 0,
              ),
            );
          }
        }

        if (storedFavorites) {
          const parsedFavorites: unknown = JSON.parse(storedFavorites);
          if (
            Array.isArray(parsedFavorites) &&
            parsedFavorites.every((id) => typeof id === 'string')
          ) {
            setFavoriteIds(parsedFavorites);
          }
        }
      } catch (error) {
        console.warn('Não foi possível carregar os itens salvos.', error);
      } finally {
        if (active) setIsReady(true);
      }
    };

    void loadStore();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    if (!isReady) return;

    void Promise.all([
      AsyncStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart)),
      AsyncStorage.setItem(
        FAVORITES_STORAGE_KEY,
        JSON.stringify(favoriteIds),
      ),
    ]).catch((error: unknown) => {
      console.warn('Não foi possível salvar os itens.', error);
    });
  }, [cart, favoriteIds, isReady]);

  const addToCart = useCallback((productId: string, quantity = 1) => {
    setCart((current) => {
      const existing = current.find((item) => item.productId === productId);
      if (existing) {
        return current.map((item) =>
          item.productId === productId
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }
      return [...current, { productId, quantity }];
    });
  }, []);

  const updateCartQuantity = useCallback(
    (productId: string, quantity: number) => {
      if (quantity <= 0) {
        setCart((current) =>
          current.filter((item) => item.productId !== productId),
        );
        return;
      }
      setCart((current) =>
        current.map((item) =>
          item.productId === productId ? { ...item, quantity } : item,
        ),
      );
    },
    [],
  );

  const removeFromCart = useCallback((productId: string) => {
    setCart((current) =>
      current.filter((item) => item.productId !== productId),
    );
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const toggleFavorite = useCallback((productId: string) => {
    setFavoriteIds((current) =>
      current.includes(productId)
        ? current.filter((id) => id !== productId)
        : [...current, productId],
    );
  }, []);

  const isFavorite = useCallback(
    (productId: string) => favoriteIds.includes(productId),
    [favoriteIds],
  );

  const value = useMemo(
    () => ({
      cart,
      favoriteIds,
      isReady,
      cartCount: cart.reduce((total, item) => total + item.quantity, 0),
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
    }),
    [
      cart,
      favoriteIds,
      isReady,
      addToCart,
      updateCartQuantity,
      removeFromCart,
      clearCart,
      toggleFavorite,
      isFavorite,
    ],
  );

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('useStore deve ser usado dentro de StoreProvider.');
  }
  return context;
}