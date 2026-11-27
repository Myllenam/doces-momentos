import { router } from 'expo-router';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Colors from '@/constants/Colors';
import { BorderRadius, FontSize, Spacing } from '@/constants/Theme';
import { useProducts } from '@/src/contexts/ProductsContext';
import { useStore } from '@/src/contexts/StoreContext';

const colors = Colors.light;
const formatPrice = (value: number) =>
  value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

export default function FavoritesScreen() {
  const { favoriteIds, isReady, toggleFavorite } = useStore();
  const { products, loading } = useProducts();
  const favorites = favoriteIds.flatMap((id) => {
    const product = products.find((item) => item.id === id);
    return product ? [product] : [];
  });

  const hasUnresolvedFavorites = favoriteIds.some(
    (id) => !products.some((product) => product.id === id),
  );

  if (!isReady || (loading && hasUnresolvedFavorites)) {
    return <View style={styles.center}><Text style={styles.muted}>Carregando seus favoritos...</Text></View>;
  }

  if (favorites.length === 0) {
    return (
      <SafeAreaView style={styles.center} edges={['top']}>
        <Text style={styles.emptyEmoji}>💗</Text>
        <Text style={styles.title}>Ainda sem favoritos</Text>
        <Text style={styles.muted}>Toque no coração de um doce para guardá-lo aqui.</Text>
        <Pressable style={styles.primaryButton} onPress={() => router.navigate('/')}>
          <Text style={styles.primaryButtonText}>Encontrar meus doces</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Meus Favoritos 💗</Text>
        <Text style={styles.muted}>{favorites.length} {favorites.length === 1 ? 'doce salvo' : 'doces salvos'}</Text>
        <View style={styles.list}>
          {favorites.map((product) => (
            <View key={product.id} style={styles.card}>
              <Pressable
                style={styles.productMain}
                onPress={() => router.push({ pathname: '/produto/[id]', params: { id: product.id } })}
              >
                <View style={styles.imageContainer}>
                  {product.imagem ? <Image source={product.imagem} style={styles.image} /> : <Text style={styles.emoji}>{product.emoji}</Text>}
                </View>
                <View style={styles.productInfo}>
                  <Text style={styles.productName} numberOfLines={2}>{product.nome}</Text>
                  <Text style={styles.category}>{product.categoria}</Text>
                  <Text style={styles.price}>{formatPrice(product.preco)}</Text>
                </View>
              </Pressable>
              <Pressable
                style={styles.removeButton}
                onPress={() => toggleFavorite(product.id)}
                accessibilityRole="button"
                accessibilityLabel={`Remover ${product.nome} dos favoritos`}
              >
                <Text style={styles.removeText}>♥  Remover</Text>
              </Pressable>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  content: { padding: Spacing.lg, paddingBottom: Spacing.xxl },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: Spacing.xl, backgroundColor: colors.background },
  title: { fontSize: FontSize.xl, fontWeight: '700', color: colors.text },
  muted: { color: colors.muted, fontSize: FontSize.md, marginTop: Spacing.xs, textAlign: 'center' },
  emptyEmoji: { fontSize: 58, marginBottom: Spacing.md },
  list: { gap: Spacing.md, marginTop: Spacing.xl },
  card: { backgroundColor: colors.card, borderRadius: BorderRadius.lg, borderWidth: 1, borderColor: colors.border, padding: Spacing.md },
  productMain: { flexDirection: 'row', gap: Spacing.md },
  imageContainer: { width: 78, height: 78, borderRadius: BorderRadius.md, backgroundColor: colors.secondary, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' },
  image: { width: '100%', height: '100%' },
  emoji: { fontSize: 38 },
  productInfo: { flex: 1, justifyContent: 'center', gap: Spacing.xs },
  productName: { color: colors.text, fontSize: FontSize.md, fontWeight: '700' },
  category: { color: colors.muted, fontSize: FontSize.sm },
  price: { color: colors.primaryDark, fontSize: FontSize.md, fontWeight: '700' },
  removeButton: { alignSelf: 'flex-end', paddingVertical: Spacing.sm, paddingHorizontal: Spacing.xs, marginTop: Spacing.xs },
  removeText: { color: colors.error, fontSize: FontSize.sm, fontWeight: '600' },
  primaryButton: { backgroundColor: colors.primaryDark, borderRadius: BorderRadius.lg, padding: Spacing.lg, alignItems: 'center', marginTop: Spacing.lg },
  primaryButtonText: { color: colors.card, fontSize: FontSize.md, fontWeight: '700' },
});
