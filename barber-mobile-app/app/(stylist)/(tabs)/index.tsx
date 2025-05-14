import HomeHeader from "@/components/shared/HomeHeader";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Stack } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { AgendaList, DateData } from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const todayDate = new Date();
  const [selected, setSelected] = useState(todayDate.toDateString());

  const handleDaySelect = (date: DateData) => {
    setSelected(date.dateString);
  };

  return (
    <View
      style={{
        backgroundColor: "white",
        flex: 1,
        paddingHorizontal: 5,
        paddingTop: 12,
      }}
    >
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      {/* <CalendarProvider date={new Date().toDateString()}>
        <WeekCalendar firstDay={1}/>
        <ExpandableCalendar
          onDayPress={handleDaySelect}
          firstDay={1}
          state="today"
          centerContent
          minDate={todayDate.toDateString()}
          calendarStyle={{ backgroundColor: "white" }}
          allowSelectionOutOfRange={false}
          animateScroll={true}
          closeOnDayPress={selected === todayDate.toDateString() ? true : false}
        />
        <AgendaList
          sections={[]}
          data={["maicol", "alan"]}
          renderItem={({ item }) => (
            <View style={{ height: 50 }}>
              <Text>{item}</Text>
            </View>
          )}
        />
      </CalendarProvider> */}
      <View style={{}}>
        <ScrollView horizontal>
          <View style={{ flexDirection: "row", gap: 10 }}>
            <Link
              href={{
                pathname: "/makeAppointment",
                params: {
                  businessId: 1,
                  role: "STYLIST",
                  userName: "Mario",
                },
              }}
            >
              <View
                style={{
                  backgroundColor: "white",
                  borderWidth: 2,
                  borderColor: "red",
                  padding: 7,
                  borderRadius: 15,
                  elevation: 5,
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                }}
              >
                <MaterialIcons name="add" color={"red"} size={20} />
                <Text
                  style={{
                    color: "red",
                    fontSize: 16,
                    fontFamily: "AmulyaMedium",
                  }}
                >
                  Agendar cita
                </Text>
              </View>
            </Link>
            <Pressable
              style={{
                backgroundColor: "white",
                borderWidth: 2,
                borderColor: "red",
                padding: 7,
                borderRadius: 15,
                elevation: 5,
                flexDirection: "row",
                alignItems: "center",
                gap: 5,
              }}
            >
              <MaterialIcons name="calendar-month" color={"red"} size={20} />
              <Text
                style={{
                  color: "red",
                  fontSize: 16,
                  fontFamily: "AmulyaMedium",
                }}
              >
                Ver calendario
              </Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>

      <Text style={{ fontFamily: "AmulyaBold", fontSize: 19 }}>
        Tus citas para hoy
      </Text>

      <AgendaList sections={[]} />
    </View>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
