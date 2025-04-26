import { View, Text, Pressable, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Stack } from "expo-router";
import { TextInput } from "react-native-paper";

export default function makeAppointment() {
  const insets = useSafeAreaInsets();
  const [status, setStatus] = useState<"loading" | "waiting" | "disabled">(
    "waiting"
  );

  const setAppointmentDate = () => {};
  return (
    <View
      style={{ backgroundColor: "#000000", flex: 1, paddingHorizontal: 10 }}
    >
      <Stack.Screen options={{ title: "Agendar cita" }} />
      <View style={{ flex: 1 }}>
        <Text>Nombre </Text>
        <TextInput
          mode="outlined"
          label={"Buscar cliente"}
          textColor="white"
          outlineStyle={{ borderWidth: 1.5, borderRadius: 7 }}
          activeOutlineColor="white"
          dense
          placeholderTextColor={"red"}
          style={{ backgroundColor: "#222222" }}
        />
      </View>
      <Pressable
        disabled={status !== "disabled"}
        style={{
          backgroundColor: "red",
          borderRadius: 8,
          justifyContent: "center",
          alignItems: "center",
          height: 45,
        }}
      >
        {status === "loading" && <ActivityIndicator color={"white"} />}
        {status === "waiting" && (
          <Text style={{ color: "white", fontSize: 17, fontWeight: "bold" }}>
            Agendar cita
          </Text>
        )}
      </Pressable>
    </View>
  );
}
