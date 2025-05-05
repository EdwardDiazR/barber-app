import HomeHeader from "@/components/shared/HomeHeader";
import { Stack } from "expo-router";
import { useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import {
  AgendaList,
  CalendarProvider,
  DateData,
  ExpandableCalendar,
  WeekCalendar,
} from "react-native-calendars";
import { useSafeAreaInsets } from "react-native-safe-area-context";
export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const todayDate = new Date();
  const [selected, setSelected] = useState(todayDate.toDateString());

  const handleDaySelect = (date: DateData) => {
    setSelected(date.dateString);
  };
  return (
    <View style={{ backgroundColor: "white", paddingTop: top, flex: 1 }}>
      <Stack.Screen options={{ header: () => <HomeHeader /> }} />
      <CalendarProvider date={new Date().toDateString()}>
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
      </CalendarProvider>
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
