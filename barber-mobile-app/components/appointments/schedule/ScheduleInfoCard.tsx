import { Colors } from "@/constants/Colors";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/es";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
moment.locale("es-do");

const ScheduleInfoCard = ({
  date,
  time,
  customerName,
}: {
  date: string;
  time: string | null;
  customerName: string;
}) => {
  const appointmentDate = moment(date).format("l");
  const appointmentTime = time ? moment(time, ["HH:mm "]).format("HH:mm:00") : "0:00";

  const formatSelectedDateTime = (): Date => {
    const datePart = moment(date).format("YYYY-MM-DD");
    const combinedDateTime = `${datePart}T${appointmentTime}`;
    return new Date(combinedDateTime);
  };

  return (
    <View style={{ backgroundColor: "transparent" }}>
      <View
        style={{
          backgroundColor: "white",
          borderRadius: 10,
          marginBottom: 10,
          padding: 3,
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
          gap: 5,
        }}
      >
        <MaterialIcons name="person-outline" size={25} color={Colors.red.primary} />
        <Text
          style={{
            textAlign: "center",
            fontSize: 18,
            fontFamily: "AmulyaMedium",
            color: Colors.red.primary,
          }}
        >
          {customerName}
        </Text>
      </View>
      {date && time && (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons name="calendar-today" size={25} color={"white"} />
            <Text style={{ fontFamily: "AmulyaMedium", color: "white", fontSize: 15.5 }}>{appointmentDate}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={28} color={"white"} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons name="schedule" size={25} color={"white"} />

            <Text style={{ fontFamily: "AmulyaMedium", fontSize: 15.5, color: "white" }}>
              {formatSelectedDateTime().toLocaleTimeString("es-DO", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </Text>
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ScheduleInfoCard;
