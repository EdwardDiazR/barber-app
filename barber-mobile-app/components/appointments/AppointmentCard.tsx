import { Colors } from "@/constants/Colors";
import { MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Divider } from "react-native-paper";

type customerInfo = {
  customer: string;
  hora: string;
};

export const AppointmentCard = ({ info }: { info: customerInfo }) => {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.infoContainer}>
        <View style={{ flexDirection: "row", gap: 5, alignItems: "center" }}>
          <MaterialIcons name="schedule" color={Colors.red.primary} size={30} />
          <Divider bold style={{ borderWidth: 0.5, height: 25, borderColor: "lightgray" }} />
          <View style={{}}>
            <Text style={{ fontFamily: "AmulyaBold" }}>{info.customer}</Text>
            <Text style={{ fontFamily: "AmulyaMedium" }}>{info.hora}</Text>
          </View>
        </View>
        <MaterialCommunityIcons name="chevron-down" size={30} />
      </View>
      {/* <View>
        <Text>Hola</Text>
      </View> */}
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    padding: 10,
    backgroundColor: "white",
    flexDirection: "column",

    marginTop: 5,
    borderRadius: 10,
    justifyContent: "center",
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 5,
    alignItems: "center",
  },
});
