import { DefaultTheme } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack, ThemeProvider } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { ProductsProvider } from '@/src/context/ProductsContext';
import "react-native-reanimated";

import Colors from "@/constants/Colors";
import { StoreProvider } from "@/src/contexts/StoreContext";

export { ErrorBoundary } from "expo-router";

SplashScreen.preventAutoHideAsync();

const AppTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: Colors.light.primaryDark,
    background: Colors.light.background,
    card: Colors.light.card,
    text: Colors.light.text,
    border: Colors.light.border,
    notification: Colors.light.primary,
  },
};

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
<ThemeProvider value={AppTheme}>
  <StoreProvider>
    <ProductsProvider>
      <Stack>
        <Stack.Screen
          name="(tabs)"
          options={{ headerShown: false }}
        />

        <Stack.Screen
          name="produto/[id]"
          options={{
            title: 'Detalhes do doce',
            headerBackTitle: 'Voltar',
            headerTintColor: Colors.light.primaryDark,
            headerStyle: {
              backgroundColor: Colors.light.background,
            },
          }}
        />
      </Stack>
    </ProductsProvider>
    </StoreProvider>
  </ThemeProvider>
 
  );
}
