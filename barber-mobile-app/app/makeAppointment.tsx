/* eslint-disable react-hooks/exhaustive-deps */
import ScheduleInfoCard from "@/components/appointments/schedule/ScheduleInfoCard";
import TimeItem from "@/components/appointments/schedule/ScheduleTimeItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useLocalSearchParams } from "expo-router";

import moment from "moment";
import "moment/locale/es";
import React, { useEffect, useState } from "react";
import { Pressable, Text, TextInput, View } from "react-native";
import { Calendar } from "react-native-calendars";
import { MarkedDates } from "react-native-calendars/src/types";
import { Divider } from "react-native-paper";
import Animated from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { FlatGrid } from "react-native-super-grid";

type MarkedDate = {
  [date: string]: {
    selected: boolean;
    marked?: boolean;
    selectedColor?: string;
    dotColor?: string;
  };
};
export default function MakeAppointment() {
  const {
    businessId,
    role: userRole,
    userName,
  } = useLocalSearchParams<{
    businessId: string;
    userName?: string;
    role: "CUSTOMER" | "STYLIST";
  }>();

  const date = new Date();
  const [times, setTimes] = useState<
    { time: string; label: string; available: boolean }[]
  >([
    { time: "9:00", label: "9:00 AM", available: true },
    { time: "9:45", label: "9:45 AM", available: true },
    { time: "10:30", label: "10:30 AM", available: true },
    { time: "11:15", label: "11:15 AM", available: true },
    { time: "12:00", label: "12:00 PM", available: true },
    { time: "12:45", label: "12:45 PM", available: true },
    { time: "13:30", label: "1:30 PM", available: true },
    { time: "14:15", label: "2:15 PM", available: true },
  ]);

  const [selectedTime, setSelectedTime] = useState<string | null>();
  useEffect(() => {}, []);

  const [selectedDate, setSelectedDate] = useState<string>(
    moment().format("YYYY-MM-DD")
  );
  const [markedAppointmentDates, setMarked] = useState<MarkedDates>({
    selectedDate: {
      selected: false,
      selectedColor: "red",
      marked: true,
      dotColor: "red",
    },
  });

  const handleSelectTime = (time: string) => {
    setSelectedTime(time);
  };
  const handleSelectDate = (date: string) => {
    setSelectedDate(date);
  };

  const formatSelectedDateTime = (): Date => {
    const datePart = moment(selectedDate).format("YYYY-MM-DD");
    const timePart = moment(selectedTime, ["HH:mm "]).format("HH:mm:00");

    const combinedDateTime = `${datePart}T${timePart}`;
    return new Date(combinedDateTime);
  };
  const insets = useSafeAreaInsets();
  const apps: { time: string; date: string }[] = [
    { time: "9:00", date: "2025-05-23" },
    { time: "12:00", date: "2025-05-22" },
    { time: "13:30", date: "2025-05-25" },
  ];
  const setAvailableTimes = () => {
    const availableTimes = times.map((t) => {
      const isTaken = apps.some(
        (a) => a.time === t.time && a.date === selectedDate
      );

      return { ...t, available: !isTaken };
    });

    setTimes(availableTimes);
  };

  const setMarkedDates = () => {
    const newMarks: MarkedDates = {};

    // Marcar todas las fechas con citas
    apps.forEach((a) => {
      newMarks[a.date] = {
        marked: true,
        dotColor: "red",
      };
    });

    // Agregar la fecha seleccionada (puede coincidir con una cita o no)
    newMarks[selectedDate] = {
      ...newMarks[selectedDate],
      selected: true,
      selectedColor: "orange",
      selectedTextColor: "white",
    };

    setMarked(newMarks);
  };

  useEffect(() => {
    setMarkedDates();
    setAvailableTimes();
    console.log("Setting available times by date!");
  }, [selectedDate]);
  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: "white",
      }}
    >
      <Stack.Screen
        options={{
          title: "Agendar cita",
          headerShown: true,
          headerShadowVisible: true,
        }}
      />

      {userRole === "STYLIST" && (
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "lightgray",
            borderRadius: 12,
            padding: 3,
            margin: 8,
            paddingHorizontal: 5,
          }}
        >
          <TextInput
            placeholder="Buscar cliente"
            spellCheck={false}
            style={{ flex: 1, fontFamily: "AmulyaMedium", fontSize: 20 }}
          />
          <Divider
            style={{
              borderWidth: 0.5,
              height: "80%",
              borderColor: "gray",
            }}
          />
          <Pressable style={{ marginHorizontal: 5 }}>
            <MaterialIcons name="search" size={35} />
          </Pressable>
        </View>
      )}

      {userRole === "CUSTOMER" && userName && <Text>Hola {userName}</Text>}

      {/* <Text style={{ fontFamily: "AmulyaMedium", fontSize: 28 }}>
        Cancan BarberShop
      </Text> */}
      <View>
        <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
          <MaterialIcons name="calendar-month" size={24} />

          <Text style={{ fontSize: 18, fontFamily: "AmulyaMedium" }}>
            Seleccione una fecha
          </Text>
        </View>
        <Calendar
          date={selectedDate}
          current={selectedDate}
          state="today"
          firstDay={1}
          monthFormat="MMMM yyyy"
          disableAllTouchEventsForDisabledDays
          minDate={date.toDateString()}
          enableSwipeMonths
          hideExtraDays
          disableArrowLeft
          markingType="dot"
          markedDates={markedAppointmentDates}
          onDayPress={({ dateString }) => {
            console.log(dateString);
            handleSelectDate(dateString);
          }}
          style={{
            backgroundColor: "white",
            borderRadius: 20,
            flexGrow: 0,
          }}
          theme={{
            nowIndicatorKnob: {},
            selectedDayTextColor: "red",
            // todayBackgroundColor: "orange",
            todayTextColor: "orange",
            selectedDayBackgroundColor: "green",

            textDayStyle: { color: "black" },
          }}
        />
      </View>
      <Divider
        style={{
          marginVertical: 10,
          marginHorizontal: 12,
          borderWidth: 0.5,
          borderColor: "lightgray",
        }}
      />
      <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
        <MaterialIcons name="schedule" size={24} />

        <Text style={{ fontSize: 18, fontFamily: "AmulyaMedium" }}>
          Seleccione una hora
        </Text>
      </View>
      <FlatGrid
        data={times}
        spacing={6}
        itemDimension={100}
        style={{ flexGrow: 0 }}
        maxItemsPerRow={3}
        renderItem={({ item, index }) => (
          <TimeItem
            key={index}
            item={item}
            handleSelectTime={handleSelectTime}
            isSelected={item.time === selectedTime}
          />
        )}
      />

      <Animated.View>
        <ScheduleInfoCard date={formatSelectedDateTime()} />
      </Animated.View>

      {/* <Text>{formatSelectedDateTime().toString()}</Text> */}
    </View>
  );
}
