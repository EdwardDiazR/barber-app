import { router, Tabs } from "expo-router";
import React from "react";
import { Platform, Pressable, View } from "react-native";

import { HapticTab } from "@/components/HapticTab";
import { IconSymbol } from "@/components/ui/IconSymbol";
import TabBarBackground from "@/components/ui/TabBarBackground";
import { Colors } from "@/constants/Colors";
import { useColorScheme } from "@/hooks/useColorScheme";
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: "absolute",
          },
          default: {},
        }),
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inicio",
          tabBarIcon: ({ color, focused }) => (
            <MaterialCommunityIcons
              size={30}
              name={focused ? "home" : "home-outline"}
              color={focused ? "red" : "gray"}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="appointment"
        options={{
          animation: "none",
          title: "Citas",
          tabBarActiveTintColor: "red",
          tabBarInactiveTintColor: "lightgray",

          tabBarIcon: ({ color, focused }) => (
            <MaterialIcons
              name="calendar-month"
              size={25}
              color={focused ? "red" : "gray"}
            />
          ),
        }}
      />
    </Tabs>
  );
}
