import { StyleSheet, Text, View } from "react-native";

import Colors from "@/constants/Colors";
import { BorderRadius, FontSize, Spacing } from "@/constants/Theme";

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.emoji}>🧁</Text>

        <Text style={styles.title}>Doces Momentos</Text>

        <Text style={styles.subtitle}>
          Um docinho para deixar seu dia mais especial!
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Bem-vindo à Doces Momentos!</Text>

          <Text style={styles.cardDescription}>
            Aqui você encontrará doces feitos com muito carinho para adoçar seus
            melhores momentos.
          </Text>

          <Text style={styles.comingSoon}>
            🍰 Nosso catálogo estará aqui em breve!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    padding: Spacing.xl,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emoji: {
    fontSize: 64,
    marginBottom: Spacing.lg,
  },
  title: {
    fontSize: FontSize.xxl,
    fontWeight: "700",
    color: Colors.light.text,
    textAlign: "center",
  },
  subtitle: {
    fontSize: FontSize.md,
    color: Colors.light.muted,
    textAlign: "center",
    marginTop: Spacing.sm,
    marginBottom: Spacing.xxl,
  },
  card: {
    width: "100%",
    backgroundColor: Colors.light.card,
    borderRadius: BorderRadius.xl,
    padding: Spacing.xl,
    alignItems: "center",
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  cardTitle: {
    fontSize: FontSize.lg,
    fontWeight: "700",
    color: Colors.light.primaryDark,
    textAlign: "center",
    marginBottom: Spacing.md,
  },
  cardDescription: {
    fontSize: FontSize.md,
    color: Colors.light.text,
    textAlign: "center",
    lineHeight: 24,
  },
  comingSoon: {
    fontSize: FontSize.sm,
    fontWeight: "600",
    color: Colors.light.primaryDark,
    textAlign: "center",
    marginTop: Spacing.xl,
  },
});
