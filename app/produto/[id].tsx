
import { useState } from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { SymbolView } from 'expo-symbols';

import Colors from '@/constants/Colors';
import {
  BorderRadius,
  FontSize,
  Spacing,
} from '@/constants/Theme';
import { buscarProdutoPorId } from '@/src/data/produtos';
import { useStore } from '@/src/contexts/StoreContext';

const colors = Colors.light;

export default function ProductDetailsScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  const product = buscarProdutoPorId(id);
  const [quantity, setQuantity] = useState(1);
  const [cartNotice, setCartNotice] = useState('');
  const { addToCart, toggleFavorite, isFavorite } = useStore();
  const favorited = product ? isFavorite(product.id) : false;

  const formatPrice = (value: number) =>
    value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });

  if (!product) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyEmoji}>🧁</Text>

        <Text style={styles.emptyTitle}>
          Produto não encontrado
        </Text>

        <Pressable
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backButtonText}>Voltar</Text>
        </Pressable>
      </View>
    );
  }

  const total = product.preco * quantity;

  const decreaseQuantity = () => {
    setQuantity((current) => Math.max(1, current - 1));
  };

  const increaseQuantity = () => {
    setQuantity((current) => current + 1);
  };

  const handleAddToCart = () => {
    addToCart(product.id, quantity);
    setCartNotice(
      `${quantity} ${quantity === 1 ? 'unidade adicionada' : 'unidades adicionadas'} ao carrinho.`,
    );
  };

  const handleToggleFavorite = () => {
    toggleFavorite(product.id);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.imageContainer}>
          {product.imagem ? (
            <Image
              source={product.imagem}
              style={styles.image}
              resizeMode="cover"
            />
          ) : (
            <Text style={styles.productEmoji}>
              {product.emoji}
            </Text>
          )}
        </View>

        <View style={styles.content}>
          <View style={styles.titleRow}>
            <View style={styles.productInfo}>
              <Text style={styles.category}>
                {product.categoria.toUpperCase()}
              </Text>

              <Text style={styles.title}>
                {product.nome}
              </Text>
            </View>

            <Pressable
              onPress={handleToggleFavorite}
              style={styles.favoriteButton}
              accessibilityRole="button"
              accessibilityLabel={
                favorited
                  ? 'Remover dos favoritos'
                  : 'Adicionar aos favoritos'
              }
            >
              <SymbolView
                name={{
                  ios: favorited ? 'heart.fill' : 'heart',
                  android: favorited
                    ? 'favorite'
                    : 'favorite_border',
                  web: 'favorite',
                }}
                tintColor={colors.primaryDark}
                size={26}
              />
            </Pressable>
          </View>

          <Text style={styles.price}>
            {formatPrice(product.preco)}
          </Text>

          <View style={styles.divider} />

          <Text style={styles.sectionTitle}>
            Sobre esse doce
          </Text>

          <Text style={styles.description}>
            {product.descricao}
          </Text>

          <View style={styles.divider} />

          <View style={styles.quantityRow}>
            <Text style={styles.sectionTitle}>
              Quantidade
            </Text>

            <View style={styles.quantityControl}>
              <Pressable
                style={styles.quantityButton}
                onPress={decreaseQuantity}
                disabled={quantity === 1}
                accessibilityLabel="Diminuir quantidade"
              >
                <Text style={styles.quantityButtonText}>
                  −
                </Text>
              </Pressable>

              <Text style={styles.quantityText}>
                {quantity}
              </Text>

              <Pressable
                style={styles.quantityButton}
                onPress={increaseQuantity}
                accessibilityLabel="Aumentar quantidade"
              >
                <Text style={styles.quantityButtonText}>
                  +
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>
            Total
          </Text>

          <Text style={styles.totalPrice}>
            {formatPrice(total)}
          </Text>
        </View>

        <Pressable
          style={styles.addButton}
          onPress={handleAddToCart}
        >
          <SymbolView
            name={{
              ios: 'bag',
              android: 'shopping_bag',
              web: 'shopping_bag',
            }}
            tintColor={colors.card}
            size={21}
          />

          <Text style={styles.addButtonText}>
            Adicionar ao carrinho
          </Text>
        </Pressable>

        {cartNotice ? (
          <View style={styles.cartNotice} accessibilityLiveRegion="polite">
            <Text style={styles.cartNoticeText}>✓ {cartNotice}</Text>
            <Pressable
              onPress={() => router.navigate('/(tabs)/carrinho')}
              accessibilityRole="button"
            >
              <Text style={styles.cartNoticeLink}>Ver carrinho</Text>
            </Pressable>
          </View>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContent: {
    paddingBottom: Spacing.xxl,
  },
  imageContainer: {
    width: '100%',
    height: 280,
    backgroundColor: colors.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  productEmoji: {
    fontSize: 100,
  },
  content: {
    padding: Spacing.xl,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    gap: Spacing.md,
  },
  productInfo: {
    flex: 1,
  },
  category: {
    fontSize: FontSize.xs,
    fontWeight: '700',
    color: colors.primaryDark,
    marginBottom: Spacing.sm,
    letterSpacing: 1,
  },
  title: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  favoriteButton: {
    width: 44,
    height: 44,
    borderRadius: BorderRadius.full,
    backgroundColor: colors.card,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: colors.border,
  },
  price: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: colors.primaryDark,
    marginTop: Spacing.md,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: Spacing.xl,
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: colors.text,
  },
  description: {
    fontSize: FontSize.md,
    color: colors.muted,
    lineHeight: 24,
    marginTop: Spacing.md,
  },
  quantityRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
  },
  quantityButton: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.md,
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantityButtonText: {
    fontSize: 23,
    fontWeight: '600',
    color: colors.primaryDark,
  },
  quantityText: {
    fontSize: FontSize.lg,
    fontWeight: '700',
    color: colors.text,
    minWidth: 20,
    textAlign: 'center',
  },
  footer: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xl,
    backgroundColor: colors.card,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    gap: Spacing.md,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: FontSize.md,
    color: colors.muted,
  },
  totalPrice: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: colors.text,
  },
  addButton: {
    height: 54,
    backgroundColor: colors.primaryDark,
    borderRadius: BorderRadius.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  addButtonText: {
    color: colors.card,
    fontSize: FontSize.md,
    fontWeight: '700',
  },
  cartNotice: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.md,
    padding: Spacing.md,
    borderRadius: BorderRadius.md,
    backgroundColor: colors.secondary,
  },
  cartNoticeText: {
    flex: 1,
    color: colors.text,
    fontSize: FontSize.sm,
    fontWeight: '600',
  },
  cartNoticeLink: {
    color: colors.primaryDark,
    fontSize: FontSize.sm,
    fontWeight: '700',
    textDecorationLine: 'underline',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: Spacing.xl,
    backgroundColor: colors.background,
  },
  emptyEmoji: {
    fontSize: 56,
  },
  emptyTitle: {
    fontSize: FontSize.xl,
    fontWeight: '700',
    color: colors.text,
    marginVertical: Spacing.xl,
  },
  backButton: {
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    backgroundColor: colors.primaryDark,
    borderRadius: BorderRadius.md,
  },
  backButtonText: {
    color: colors.card,
    fontWeight: '700',
  },
});
