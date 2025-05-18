import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import moment from "moment";
import "moment/locale/es";
import React from "react";
import { Text, View } from "react-native";
import Animated from "react-native-reanimated";
moment.locale("es-do");

const ScheduleInfoCard = ({ date, time }: { date: string; time: string | null }) => {
  const appointmentDate = moment(date).format("l");
  const appointmentTime = time ? moment(time, ["HH:mm "]).format("HH:mm:00") : "0:00";

  const formatSelectedDateTime = (): Date => {
    const datePart = moment(date).format("YYYY-MM-DD");
    const combinedDateTime = `${datePart}T${appointmentTime}`;
    return new Date(combinedDateTime);
  };

  return (
    <View style={{}}>
      <Text
        style={{
          textAlign: "center",
          fontSize: 18,
          fontFamily: "AmulyaMedium",
          color: "green",
        }}
      >
        Informacion del turno
      </Text>
      {date && time && (
        <Animated.View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons name="calendar-today" size={25} />
            <Text style={{ fontFamily: "AmulyaMedium", fontSize: 15.5 }}>{appointmentDate}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={28} />
          <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
            <MaterialIcons name="schedule" size={25} />
            {time && (
              <Text style={{ fontFamily: "AmulyaMedium", fontSize: 15.5 }}>
                {formatSelectedDateTime().toLocaleTimeString("es-DO", {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </Text>
            )}
          </View>
        </Animated.View>
      )}
    </View>
  );
};

export default ScheduleInfoCard;
