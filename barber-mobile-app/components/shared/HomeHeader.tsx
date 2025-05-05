import React from "react";
import { Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const HomeHeader = () => {
  const insets = useSafeAreaInsets();
  return (
    <View style={{ paddingTop: insets.top, paddingHorizontal: 10 }}>
      <Text style={{ fontSize: 20 }}>Hola, Cancan</Text>
    </View>
  );
};

export default HomeHeader;
