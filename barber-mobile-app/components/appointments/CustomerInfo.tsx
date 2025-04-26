import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";

const CustomerInfo = ({ customer }: { customer: { name: string } }) => {
  useEffect(() => {
    console.log(customer);
  }, [customer]);
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 3,
        gap: 10,
      }}
    >
      <View style={{ flexDirection: "row", alignItems: "center",gap:5 }}>
        <MaterialIcons name="person" size={20} />
        <Text style={{ fontSize: 17 }}>{customer.name}</Text>
      </View>

      <Pressable style={styles.deleteButton}>
        <MaterialIcons name="cancel" size={22} color={"white"} />
        <Text style={styles.deleteButtonText}>Cambiar cliente</Text>
      </Pressable>
    </View>
  );
};

export default CustomerInfo;

const styles = StyleSheet.create({
  deleteButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "red",
    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    gap: 10,
  },
  deleteButtonText: {
    fontSize: 17,
    textAlign: "center",
    color: "white",
  },
});
