import { Colors } from "@/constants/Colors";
import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import { Pressable, Text } from "react-native";
const SearchCustomerListItem = ({ name }: { name: string }) => {
  return (
    <Pressable
      style={{
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        margin: 5,
        elevation: 2,
        backgroundColor: "white",
        padding: 3,
        borderRadius: 10,
      }}
    >
      <Octicons name="person" size={29} color={Colors.red.secondary} />
      <Text style={{ fontSize: 16, fontFamily: "AmulyaMedium", color: Colors.red.primary }}>{name}</Text>
    </Pressable>
  );
};

export default SearchCustomerListItem;
