import { Stack } from "expo-router";
import React from "react";

export default function _layout() {
  const isUserLogged = false;
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="forgotPassword" />
      {!isUserLogged && <Stack.Screen name="signUp" />}
    </Stack>
  );
}
