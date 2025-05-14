import { Colors } from "@/constants/Colors";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeHeader = () => {
  const insets = useSafeAreaInsets();

  const stylistName = "Cancan";
  return (
    <View
      style={{
        paddingTop: insets.top + 5,
        paddingHorizontal: 10,
        backgroundColor: Colors.red.primary,
      }}
    >
      <StatusBar style="auto" animated hideTransitionAnimation="fade" />
      <Text
        style={{ fontSize: 25, fontFamily: "AmulyaMedium", color: "white" }}
      >
        Hola, {stylistName}
      </Text>
    </View>
  );
};

export default HomeHeader;
