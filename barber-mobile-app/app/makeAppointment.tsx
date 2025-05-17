/* eslint-disable react-hooks/exhaustive-deps */
import ScheduleCalendar from "@/components/appointments/schedule/ScheduleCalendar";
import ScheduleInfoCard from "@/components/appointments/schedule/ScheduleInfoCard";
import TimeItem from "@/components/appointments/schedule/ScheduleTimeItem";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Stack, useLocalSearchParams } from "expo-router";

import moment from "moment";
import "moment/locale/es";
import React, { useEffect, useMemo, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";
import { DateData, MarkedDates } from "react-native-calendars/src/types";
import { Divider } from "react-native-paper";
import Animated, { FadeInDown } from "react-native-reanimated";
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

type Horario = {
  time: string; // formato "HH:mm"
  label: string; // formato "h:mm AM/PM"
  available: boolean;
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

  const todaysDate = new Date();
  const [times, setTimes] = useState<Horario[]>([]);
  const generateSchedule = (startHour: number, endHour: number, intervalMinutes: number = 45): Horario[] => {
    const horarios: Horario[] = [];

    const start = new Date();
    start.setHours(startHour, 0, 0, 0); // 8:00 AM

    const end = new Date();
    end.setHours(endHour, 0, 0, 0); // 8:00 PM

    while (start <= end) {
      const hours = start.getHours().toString().padStart(2, "0");
      const minutes = start.getMinutes().toString().padStart(2, "0");
      const time = `${hours}:${minutes}`;

      const hour12 = start.getHours() % 12 || 12;
      const meridian = start.getHours() >= 12 ? "PM" : "AM";
      const label = `${hour12}:${minutes} ${meridian}`;

      horarios.push({
        time,
        label,
        available: true,
      });

      start.setMinutes(start.getMinutes() + intervalMinutes);
    }

    return horarios;
  };

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<string>(moment().format("YYYY-MM-DD"));
  const [markedAppointmentDates, setMarked] = useState<MarkedDates>({});

  const [customerName, setCustomerName] = useState<string>("Juan");
  const handleSelectTime = (time: string | null) => {
    setSelectedTime(time);
  };

  const handleSelectDate = (date: DateData) => {
    if (selectedDate !== date.dateString) {
      setSelectedDate(date.dateString);
    }
  };

  const formatFullDate = (): Date => {
    const datePart = moment(selectedDate).format("YYYY-MM-DD");
    const timePart = selectedTime ? moment(selectedTime, ["HH:mm"]).format("HH:mm:00") : "0:00";
    const combinedDateTime = `${datePart}T${timePart}`;
    return new Date(combinedDateTime);
  };
  const insets = useSafeAreaInsets();
  const [apps, setApps] = useState<{ time: string; date: string }[]>([
    { time: "9:00", date: "2025-05-23" },
    { time: "12:30", date: "2025-05-22" },
    { time: "14:45", date: "2025-05-22" },
    { time: "18:30", date: "2025-05-22" },

    { time: "13:30", date: "2025-05-25" },
    { time: "13:30", date: "2025-05-26" },
  ]);
  const setAvailableTimes = useMemo(() => {
    const availableTimes = times.map((t) => {
      const isTaken = apps.some((a) => a.time === t.time && a.date === selectedDate);

      return { ...t, available: !isTaken };
    });

    setTimes(availableTimes);
  }, [selectedDate]);

  const setMarkedDates = useMemo(() => {
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
  }, [selectedDate, apps]);

  useEffect(() => {
    setTimes(generateSchedule(8, 20, 45));
  }, []);

  return (
    <View
      style={{
        flex: 1,
        paddingHorizontal: 8,
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
      <View style={{ flex: 1, marginTop: 10 }}>
        <ScrollView showsVerticalScrollIndicator={false}>

          {/* todo: Make an bottom sheet with search options like bar and the list w results  */}
          {userRole === "STYLIST" && (
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
                backgroundColor: "lightgray",
                borderRadius: 8,
                padding: 1,
                paddingHorizontal: 5,
                marginBottom: 5,
              }}
            >
              <TextInput
                placeholder="Buscar cliente"
                spellCheck={false}
                style={{ flex: 1, fontFamily: "AmulyaRegular", fontSize: 16 }}
                clearButtonMode="while-editing"
              />
              <Divider
                style={{
                  borderWidth: 0.4,
                  height: "80%",
                  borderColor: "gray",
                }}
              />
              <Pressable style={{ marginHorizontal: 5 }}>
                <MaterialIcons name="search" size={25} />
              </Pressable>
            </View>
          )}

          {userRole === "CUSTOMER" && userName && <Text>Hola {userName}</Text>}

          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialIcons name="person-outline" size={24} />
              <Text style={{ fontSize: 16.5, fontFamily: "AmulyaMedium" }}>Cliente</Text>
            </View>

            <View
              style={{ elevation: 2, backgroundColor: "white", padding: 10, borderRadius: 10, marginHorizontal: 3 }}
            >
              <Text>{customerName}</Text>
            </View>
          </View>
          <Divider
            style={{
              marginVertical: 10,
              marginHorizontal: 12,
              borderWidth: 0.5,
              borderColor: "lightgray",
            }}
          />
          <View>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 5 }}>
              <MaterialIcons name="calendar-month" size={24} />
              <Text style={{ fontSize: 16.5, fontFamily: "AmulyaMedium" }}>Seleccione una fecha</Text>
            </View>

            <ScheduleCalendar
              todaysDate={todaysDate}
              selectedDate={selectedDate}
              markedAppointmentDates={markedAppointmentDates}
              handleSelectDate={handleSelectDate}
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

            <Text style={{ fontSize: 16.5, fontFamily: "AmulyaMedium" }}>Seleccione una hora</Text>
          </View>
          <FlatGrid
            data={times}
            spacing={6}
            itemDimension={50}
            style={{ flexGrow: 0 }}
            maxItemsPerRow={4}
            nestedScrollEnabled
            scrollEnabled={false}
            showsVerticalScrollIndicator={false}
            renderItem={({ item, index }) => (
              <TimeItem
                key={index}
                item={item}
                handleSelectTime={handleSelectTime}
                isSelected={item.available && item.time === selectedTime}
                selectedTime={selectedTime}
              />
            )}
          />
        </ScrollView>
      </View>
      <View>
        {selectedDate && selectedTime && (
          <Animated.View
            entering={FadeInDown}
            style={{ backgroundColor: "white", elevation: 1, borderRadius: 15, padding: 5, gap: 10, margin: 5 }}
          >
            <ScheduleInfoCard date={selectedDate} time={selectedTime} />
          </Animated.View>
        )}

        <Pressable
          style={{
            backgroundColor: "#226ce0",
            marginVertical: 8,
            borderRadius: 10,
            height: 40,
            alignItems: "center",
            justifyContent: "center",
            margin: 10,
            marginBottom: 20,
          }}
        >
          <Text
            style={{
              color: "white",
              fontFamily: "AmulyaMedium",
              fontSize: 17,
              textAlign: "center",
            }}
          >
            Agregar cita
          </Text>
        </Pressable>
      </View>
    </View>
  );
}
