import { router } from 'expo-router';
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { BorderRadius, FontSize, Spacing } from '@/constants/Theme';
import { useProducts } from '@/src/contexts/ProductsContext';
import { useStore } from '@/src/contexts/StoreContext';

const colors = Colors.light;
const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function CartScreen() {
  const { cart, isReady, updateCartQuantity, removeFromCart, clearCart } = useStore();
  const { products, loading } = useProducts();
  const cartProducts = cart.flatMap((item) => {
    const product = products.find((entry) => entry.id === item.productId);
    return product ? [{ product, quantity: item.quantity }] : [];
  });
  const hasUnresolvedCartItems = cart.some(
    (item) => !products.some((product) => product.id === item.productId),
  );
  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
  const total = cartProducts.reduce(
    (sum, item) => sum + item.product.preco * item.quantity,
    0,
  );

  const handleCheckout = () => {
    clearCart();
    Alert.alert(
      'Pedido finalizado! 🎉',
      `Sua compra no valor de ${formatPrice(total)} foi registrada. Obrigado por escolher a Doces Momentos!`,
    );
  };

  if (!isReady || (loading && hasUnresolvedCartItems)) {
    return <View style={styles.center}><Text style={styles.muted}>Carregando seu carrinho...</Text></View>;
  }

  if (cartProducts.length === 0) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <Text style={styles.emptyEmoji}>🛍️</Text>
        <Text style={styles.title}>Seu carrinho está vazio</Text>
        <Text style={styles.muted}>Escolha seus doces favoritos para começar.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.navigate('/')}>
          <Text style={styles.primaryButtonText}>Explorar doces</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Meu Carrinho 🛍️</Text>
        <Text style={styles.muted}>{totalItems} {totalItems === 1 ? 'item' : 'itens'} selecionados</Text>

        <View style={styles.list}>
          {cartProducts.map(({ product, quantity }) => (
            <View key={product.id} style={styles.itemCard}>
              <Pressable
                style={styles.productMain}
                onPress={() => router.push({ pathname: '/produto/[id]', params: { id: product.id } })}
              >
                <View style={styles.imageContainer}>
                  {product.imagem ? <Image source={product.imagem} style={styles.image} /> : <Text style={styles.emoji}>{product.emoji}</Text>}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{product.nome}</Text>
                  <Text style={styles.productPrice}>{formatPrice(product.preco)} cada</Text>
                  <Text style={styles.lineTotal}>{formatPrice(product.preco * quantity)}</Text>
                </View>
              </Pressable>

              <View style={styles.itemActions}>
                <View style={styles.quantityControl}>
                  <Pressable style={styles.quantityButton} onPress={() => updateCartQuantity(product.id, quantity - 1)} accessibilityLabel={`Diminuir quantidade de ${product.nome}`}>
                    <Text style={styles.quantityButtonText}>−</Text>
                  </Pressable>
                  <Text style={styles.quantity}>{quantity}</Text>
                  <Pressable style={styles.quantityButton} onPress={() => updateCartQuantity(product.id, quantity + 1)} accessibilityLabel={`Aumentar quantidade de ${product.nome}`}>
                    <Text style={styles.quantityButtonText}>+</Text>
                  </Pressable>
                </View>
                <Pressable onPress={() => removeFromCart(product.id)} accessibilityRole="button" accessibilityLabel={`Remover ${product.nome} do carrinho`}>
                  <Text style={styles.removeText}>Remover</Text>
                </Pressable>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.summary}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>{formatPrice(total)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>{formatPrice(total)}</Text>
          </View>
          <Text style={styles.deliveryNote}>Frete e pagamento serão combinados na finalização do pedido.</Text>
        </View>

        <Pressable style={styles.primaryButton} onPress={() => router.navigate('/')}>
          <Text style={styles.primaryButtonText}>Continuar comprando</Text>
        </Pressable>
        <Pressable
          style={styles.checkoutButton}
          onPress={handleCheckout}
          accessibilityRole="button"
        >
          <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, backgroundColor: colors.background },
  title: { fontSize: FontSize.xl, fontWeight: '700', color: colors.text },
  muted: { color: colors.muted, fontSize: FontSize.md, marginTop: Spacing.xs },
  emptyEmoji: { fontSize: 58, marginBottom: Spacing.md },
  list: { gap: Spacing.md, marginTop: Spacing.xl },
  itemCard: { backgroundColor: colors.card, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.md },
  productMain: { flexDirection: 'row', gap: Spacing.md },
  imageContainer: { width: 76, height: 76, borderRadius: BorderRadius.md, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  emoji: { fontSize: 36 },
  productInfo: { flex: 1, justifyContent: 'center', gap: Spacing.xs },
  productName: { color: colors.text, fontSize: FontSize.md, fontWeight: '700' },
  productPrice: { color: colors.muted, fontSize: FontSize.sm },
  lineTotal: { color: colors.primaryDark, fontWeight: '700', fontSize: FontSize.md },
  itemActions: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: Spacing.md, paddingTop: Spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  quantityControl: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  quantityButton: { width: 34, height: 34, alignItems: 'center', justifyContent: 'center', borderRadius: BorderRadius.md, backgroundColor: colors.background, borderWidth: 1, borderColor: colors.border },
  quantityButtonText: { color: colors.primaryDark, fontSize: 21, fontWeight: '600' },
  quantity: { minWidth: 20, textAlign: 'center', color: colors.text, fontWeight: '700' },
  removeText: { color: colors.error, fontSize: FontSize.sm, fontWeight: '600' },
  summary: { backgroundColor: colors.card, borderRadius: BorderRadius.lg, padding: Spacing.lg, marginTop: Spacing.xl, gap: Spacing.md, borderWidth: 1, borderColor: colors.border },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  summaryLabel: { color: colors.muted, fontSize: FontSize.md },
  summaryValue: { color: colors.text, fontSize: FontSize.md },
  totalLabel: { color: colors.text, fontSize: FontSize.lg, fontWeight: '700' },
  totalValue: { color: colors.primaryDark, fontSize: FontSize.xl, fontWeight: '700' },
  deliveryNote: { color: colors.muted, fontSize: FontSize.sm, lineHeight: 20 },
  primaryButton: { backgroundColor: colors.primaryDark, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.lg },
  primaryButtonText: { color: colors.card, fontSize: FontSize.md, fontWeight: '700' },
  checkoutButton: { backgroundColor: colors.success, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.md },
  checkoutButtonText: { color: colors.card, fontSize: FontSize.md, fontWeight: '700' },
});
