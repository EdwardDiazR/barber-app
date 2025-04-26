import {
  Image,
  StyleSheet,
  Platform,
  View,
  Text,
  Pressable,
} from "react-native";

import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Link, Redirect } from "expo-router";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{ backgroundColor: "#000000", flex: 1, paddingTop: insets.top }}
    >
      <Text style={{ color: "white" }}>Hola Junior</Text>
      <Redirect href={"/appointments/makeAppointment"}/>
      <Link
        href={"/appointments/makeAppointment"}
        style={{ backgroundColor: "red" }}
      >
        <Text>Agendar cita</Text>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
