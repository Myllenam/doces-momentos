import { useMemo, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { BorderRadius, FontSize, Spacing } from "@/constants/Theme";
import ProductCard from "@/src/components/ProductCard";
import { categorias, type CategoryFilter } from "@/src/data/produtos";
import { useProducts } from "@/src/context/ProductsContext";

export default function HomeScreen() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] =
    useState<CategoryFilter>("Todos");
  const { products, loading, refreshProducts } = useProducts();

  const filteredProducts = useMemo(() => {
    const normalizedSearch = search.trim().toLocaleLowerCase("pt-BR");

    return products.filter((product) => {
      const matchesSearch = product.nome
        .toLocaleLowerCase("pt-BR")
        .includes(normalizedSearch);

      const matchesCategory =
        selectedCategory === "Todos" || product.categoria === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [products, search, selectedCategory]);

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <FlatList
        data={filteredProducts}
        refreshing={loading}
        onRefresh={() => {
          void refreshProducts();
        }}
        keyExtractor={(item) => item.id}
        numColumns={2}
        columnWrapperStyle={styles.productRow}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.greeting}>Feito com carinho 💗</Text>

            <Text style={styles.title}>Doces Momentos</Text>

            <Text style={styles.subtitle}>
              Um docinho para deixar seu dia mais especial!
            </Text>

            <TextInput
              style={styles.searchInput}
              placeholder="Qual doce você procura?"
              placeholderTextColor={Colors.light.muted}
              value={search}
              onChangeText={setSearch}
              autoCorrect={false}
              returnKeyType="search"
            />

            <FlatList
              horizontal
              data={categorias}
              keyExtractor={(item) => item}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.categories}
              renderItem={({ item }) => {
                const selected = selectedCategory === item;

                return (
                  <Pressable
                    onPress={() => setSelectedCategory(item)}
                    style={[
                      styles.categoryButton,
                      selected && styles.categorySelected,
                    ]}
                  >
                    <Text
                      style={[
                        styles.categoryText,
                        selected && styles.categoryTextSelected,
                      ]}
                    >
                      {item}
                    </Text>
                  </Pressable>
                );
              }}
            />

            <Text style={styles.sectionTitle}>Nossos docinhos 🍰</Text>
            {loading && (
              <ActivityIndicator
                size="small"
                color={Colors.light.primaryDark}
                style={{ marginTop: Spacing.md }}
              />
            )}
          </View>
        }
        renderItem={({ item }) => (
          <View style={styles.productColumn}>
            <ProductCard
              product={item}
              onPress={() =>
                router.push({
                  pathname: "/produto/[id]",
                  params: { id: item.id },
                })
              }
            />
          </View>
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyEmoji}>🧁</Text>
            <Text style={styles.emptyTitle}>Nenhum doce encontrado</Text>
            <Text style={styles.emptyText}>
              Tente outra pesquisa ou categoria.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  listContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl,
  },
  header: {
    marginBottom: Spacing.lg,
  },
  greeting: {
    fontSize: FontSize.sm,
    color: Colors.light.primaryDark,
    fontWeight: "600",
    marginBottom: Spacing.sm,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: FontSize.sm,
    color: Colors.light.muted,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xl,
  },
  searchInput: {
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.lg,
    borderWidth: 1,
    borderColor: Colors.light.border,
    paddingHorizontal: Spacing.lg,
    height: 50,
    fontSize: FontSize.md,
    color: Colors.light.text,
    marginBottom: Spacing.lg,
  },
  categories: {
    gap: Spacing.sm,
    paddingVertical: Spacing.xs,
  },
  categoryButton: {
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
    borderRadius: BorderRadius.full,
    backgroundColor: Colors.light.card,
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  categorySelected: {
    backgroundColor: Colors.light.primaryDark,
    borderColor: Colors.light.primaryDark,
  },
  categoryText: {
    fontSize: FontSize.sm,
    color: Colors.light.text,
    fontWeight: "500",
  },
  categoryTextSelected: {
    color: Colors.light.card,
    fontWeight: "700",
  },
  sectionTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
    marginTop: Spacing.xl,
  },
  productRow: {
    gap: Spacing.md,
    marginBottom: Spacing.md,
  },
  productColumn: {
    flex: 1,
    minWidth: 0,
    maxWidth: "50%",
  },
  emptyContainer: {
    alignItems: "center",
    paddingVertical: Spacing.xxl,
    gap: Spacing.sm,
  },
  emptyEmoji: {
    fontSize: 48,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.light.text,
  },
  emptyText: {
    fontSize: FontSize.sm,
    color: Colors.light.muted,
    textAlign: "center",
  },
});
