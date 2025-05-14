import { Tabs } from "expo-router";
import React from "react";

import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarLabelStyle: {
          fontSize: 12,
          fontFamily: "AmulyaBold",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              size={28}
              name={"home"}
              color={focused ? "red" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="account"
        options={{
          title: "Mi cuenta",
          headerShown: true,
          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              size={30}
              name="account-circle"
              color={Colors.red.primary}
            />
          ),
        }}
      />
    </Tabs>
  );
}
