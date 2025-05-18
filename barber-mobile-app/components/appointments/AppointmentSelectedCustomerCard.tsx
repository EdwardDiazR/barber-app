import { AppointmentSelectedCustomer } from "@/models/Customer";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

const AppointmentSelectedCustomerCard = ({ customer }: { customer: AppointmentSelectedCustomer | null }) => {
  return (
    <>
      {customer ? (
        <View
          style={{
            elevation: 2,
            backgroundColor: "white",
            padding: 10,
            borderRadius: 10,
            marginHorizontal: 3,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1 }}>
            <Text style={{ fontFamily: "AmulyaMedium", fontSize: 15}}>
              {customer.alias ? ` ${customer.alias}` : `${customer.name}`}
            </Text>
          </View>
          <MaterialIcons
            name="delete"
            size={20}
            color={"red"}
            onPress={() => {
              // setCustomer(null);
            }}
          />
        </View>
      ) : (
        <Text style={{ textAlign: "center" }}>Seleccionar cliente</Text>
      )}
    </>
  );
};

export default AppointmentSelectedCustomerCard;

const styles = StyleSheet.create({});
