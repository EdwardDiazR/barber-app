import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { TextInput } from "react-native-paper";
import MakeAppointmentForm from "@/components/appointments/MakeAppointmentForm";

export default function makeAppointment() {
  const insets = useSafeAreaInsets();


  const setAppointmentDate = () => {};
  return (
    <View
      style={{ backgroundColor: "#000000", flex: 1, paddingHorizontal: 10 }}
    >
      <Stack.Screen options={{ title: "Agendar cita" }} />
      <MakeAppointmentForm />
    </View>
  );
}
