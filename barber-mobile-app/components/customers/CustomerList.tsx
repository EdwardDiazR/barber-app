import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import Animated, { FadeIn } from "react-native-reanimated";

export type ListParams = {
  data: { name: string }[];
  setCustomer: (id: number) => void;
};
const CustomerList = (props: ListParams) => {
  return (
    <Animated.FlatList
      entering={FadeIn.duration(1000)}
      data={props.data}
      ListEmptyComponent={() => (
        <View>
          <Text style={{ color: "white" }}>No se encontraron clientes</Text>
        </View>
      )}
      renderItem={({ item, index }) => (
        <Pressable
          key={index}
          onPress={() => {
            props.setCustomer(1);
          }}
          style={{
            backgroundColor: "lightgray",
            margin: 5,
            borderRadius: 10,
            padding: 10,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ color: "black" }}>{item.name}</Text>
        </Pressable>
      )}
    />
  );
};

export default CustomerList;

const styles = StyleSheet.create({});
