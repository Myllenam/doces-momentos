
import {
  Image,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '@/constants/Colors';
import { BorderRadius, Spacing } from '@/constants/Theme';
import type { Product } from '../types/Product';

interface ProductCardProps {
  product: Product;
  onPress: () => void;
}

export default function ProductCard({
  product,
  onPress,
}: ProductCardProps) {
  const precoFormatado = product.preco.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  });

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.imageContainer}>
        {product.imagem ? (
          <Image
            source={product.imagem}
            style={styles.image}
            resizeMode="cover"
          />
        ) : (
          <Text style={styles.emoji}>{product.emoji}</Text>
        )}
      </View>

      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>
          {product.nome}
        </Text>

        <Text style={styles.category}>
          {product.categoria}
        </Text>

        <Text style={styles.price}>
          {precoFormatado}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  pressed: {
    opacity: 0.8,
  },
  imageContainer: {
    height: 145,
    backgroundColor: Colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emoji: {
    fontSize: 52,
  },
  content: {
    padding: Spacing.md,
    gap: Spacing.xs,
  },
  name: {
    fontSize: 15,
    fontWeight: '700',
    color: Colors.light.text,
    minHeight: 40,
  },
  category: {
    fontSize: 12,
    color: Colors.light.muted,
  },
  price: {
    fontSize: 17,
    fontWeight: '700',
    color: Colors.light.primaryDark,
    marginTop: Spacing.sm,
  },
});
