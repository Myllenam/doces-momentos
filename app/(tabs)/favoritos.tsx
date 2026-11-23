import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";

export default function FavoritesScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Favoritos 💗</Text>
      <Text style={styles.subtitle}>
        Seus docinhos preferidos em um só lugar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light.background,
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.light.text,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.light.muted,
    marginTop: 8,
  },
});
