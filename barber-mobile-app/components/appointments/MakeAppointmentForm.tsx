import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useRef, useState } from "react";
import { Divider, TextInput, TextInputProps } from "react-native-paper";
import CustomerList from "../customers/CustomerList";
import Animated, {
  BounceIn,
  FadeInDown,
  FadeInUp,
} from "react-native-reanimated";
import { Customer } from "@/models/Customer";
import { Ionicons } from "@expo/vector-icons";
import CustomerInfo from "./CustomerInfo";
import DateTimePicker from "@react-native-community/datetimepicker";
import Calendar from "./Calendar";

const MakeAppointmentForm = () => {
  const [status, setStatus] = useState<"loading" | "waiting" | "disabled">(
    "waiting"
  );
  const [searchNameInput, setSearchNameInput] = useState<string>();
  const [appointmentCustomer, setAppointmentCustomer] = useState<Pick<
    Customer,
    "name"
  > | null>(null);
  const customers: { name: string }[] = [{ name: "Juan" }, { name: "Maria" }];

  const [filteredCustomers, setFilteredCustomers] = useState<
    { name: string }[]
  >([]);
  const handleCustomerSearch = (name: string) => {
    setSearchNameInput(name);
    setAppointmentCustomer(null);
    setFilteredCustomers(
      customers.filter(
        (customer) => customer.name.toUpperCase() == name.toUpperCase()
      )
    );
  };
  const nameSearchInputRef = useRef(null);
  const selectAppointmentCustomer = (id: number) => {
    console.log("Setting customer");

    setAppointmentCustomer({
      name: "Juan",
    });

    setSearchNameInput("");
  };

  const deleteSelectedCustomer = () => {
    console.log("deleting");

    setAppointmentCustomer(null);
  };
  const date = new Date();
  return (
    <>
      <View style={{ flex: 1 }}>
        <>
          <Text style={{ color: "white", fontSize: 20 }}>Buscar cliente</Text>

          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <TextInput
              mode="outlined"
              label={"Buscar cliente"}
              textColor="white"
              outlineStyle={{ borderWidth: 1.5, borderRadius: 7 }}
              activeOutlineColor="white"
              dense
              placeholderTextColor={"red"}
              style={{ backgroundColor: "#222222", flex: 1 }}
              onChangeText={handleCustomerSearch}
              ref={nameSearchInputRef}
              value={searchNameInput}
            />

            <Pressable>
              <Ionicons name="search" color={"white"} size={30} />
            </Pressable>
          </View>
        </>
        <Divider
          style={{
            marginVertical: 10,
            borderWidth: 0.6,
            borderRadius: 100,
            borderColor: "white",
          }}
        />
        {filteredCustomers && !appointmentCustomer && searchNameInput && (
          <CustomerList
            data={filteredCustomers}
            setCustomer={selectAppointmentCustomer}
          />
        )}
        {appointmentCustomer && (
          <CustomerInfo
            customer={appointmentCustomer}
            deleteSelectedCustomer={deleteSelectedCustomer}
          />
        )}
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            marginTop: 15,
            borderTopEndRadius: 10,
            borderTopStartRadius: 10,
            padding: 5,
          }}
        >
          <ScrollView>
            <View>
              <Text>Datos</Text>

              <Text>Fecha:</Text>
              <Calendar />
            </View>
          </ScrollView>
          <Pressable
            disabled={status !== "disabled"}
            style={{
              backgroundColor: "lightgray",
              borderRadius: 8,
              justifyContent: "center",
              alignItems: "center",

              height: 45,
            }}
          >
            {status === "loading" && <ActivityIndicator color={"white"} />}
            {status === "waiting" && (
              <Text
                style={{ color: "white", fontSize: 17, fontWeight: "bold" }}
              >
                Agendar cita
              </Text>
            )}
          </Pressable>
        </View>
      </View>
    </>
  );
};

export default MakeAppointmentForm;

const styles = StyleSheet.create({});
