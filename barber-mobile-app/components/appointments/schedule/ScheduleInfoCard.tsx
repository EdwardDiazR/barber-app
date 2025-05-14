import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/es";
import React from "react";
import { Text, View } from "react-native";
moment.locale("es-do");

const ScheduleInfoCard = ({ date }: { date: Date }) => {
  const appointmentDate = moment(date).format("l");
  const appointmentTime = moment(date).format("HH:mm A");

  return (
    <View
      style={{
        backgroundColor: "white",
        elevation: 3,
        borderRadius: 15,
        padding: 20,
        gap: 10,
        margin: 5,
      }}
    >
      <Text
        style={{
          textAlign: "center",
          fontSize: 20,
          fontFamily: "AmulyaMedium",
        }}
      >
        Informacion del turno
      </Text>
      {date &&
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialIcons name="calendar-today" size={25} />
          <Text style={{ fontFamily: "AmulyaBold", fontSize: 17 }}>
            {appointmentDate}
          </Text>
        </View>
        <MaterialIcons name="chevron-right" size={28} />
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialIcons name="schedule" size={25} />
          <Text style={{ fontFamily: "AmulyaBold", fontSize: 17 }}>
            {date.toLocaleTimeString("es-DO", {
              hour12: true,
              hour: "2-digit",
              minute: "2-digit",
            })}
          </Text>
        </View>
      </View>}
    </View>
  );
};

export default ScheduleInfoCard;
