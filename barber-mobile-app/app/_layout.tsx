import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";

import { useColorScheme } from "@/hooks/useColorScheme";

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    AmulyaRegular: require("@/assets/fonts/Amulya-Regular.otf"),
    AmulyaMedium: require("@/assets/fonts/Amulya-Medium.otf"),
    AmulyaBold: require("@/assets/fonts/Amulya-Bold.otf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === "dark" ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="(stylist)" options={{ headerShown: false }} />
        <Stack.Screen
          name="makeAppointment"
          options={{
            title: "Agendar cita",
            animation: "fade_from_bottom",
            headerShown:true
          }}
        />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
