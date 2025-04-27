import { Pressable, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";

import { Ionicons, MaterialIcons } from "@expo/vector-icons";
import { Customer } from "@/models/Customer";

const CustomerInfo = ({
  customer,
  deleteSelectedCustomer,
}: {
  customer: Pick<Customer, "name"> | null;
  deleteSelectedCustomer: () => void;
}) => {
  useEffect(() => {
    console.log(customer);
  }, [customer]);
  return (
    <View
      style={{
        backgroundColor: "white",
        padding: 10,
        borderRadius: 10,
        elevation: 1,
        gap: 10,
      }}
    >
      <Text>Cliente seleccionado</Text>
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialIcons name="person" size={20} />
        <Text style={{ fontSize: 17 }}>{customer?.name}</Text>
      </View>

      <Pressable style={styles.deleteButton} onPress={deleteSelectedCustomer}>
        <MaterialIcons name="cancel" size={22} color={"red"} />
      </Pressable>
    </View>
  );
};

export default CustomerInfo;

const styles = StyleSheet.create({
  deleteButton: {
    position: "absolute",
    right: 0,
    margin: 5,
    flexDirection: "row",
    alignItems: "center",

    padding: 5,
    borderRadius: 10,
    justifyContent: "center",
    gap: 10,
  },
});
