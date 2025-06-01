import { AppointmentCard } from "@/components/appointments/AppointmentCard";
import HomeHeader from "@/components/shared/HomeHeader";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Link, Stack } from "expo-router";
import moment from "moment";
import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, ScrollView, Text, View } from "react-native";
import { CalendarProvider, DateData, ExpandableCalendar } from "react-native-calendars";
import { Positions } from "react-native-calendars/src/expandableCalendar";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function HomeScreen() {
  const { top } = useSafeAreaInsets();
  const todayDate = new Date();
  const [selected, setSelected] = useState<string>(todayDate.toDateString());

  const handleDaySelect = (date: DateData) => {
    setSelected(date.dateString);
  };

  const resetDate = () => {
    setSelected(todayDate.toDateString());
  };
  const renderItem = useCallback((item: any) => {
    return <Text>{item.name}</Text>;
  }, []);
  const renderDay = useCallback((item: any) => {
    return <Text>{item.name}</Text>;
  }, []);
  const marked = selected
    ? {
        [selected]: {
          selected: true,
          marked: true,
          selectedColor: "red",

          disableTouchEvent: true,
        },
      }
    : {};

  useEffect(() => {
    console.log("Selected", moment(selected, true).toDate());

    console.log("Todays", moment(todayDate, true).toDate());
  }, [selected, todayDate]);

  const checkSelectedDateIsToday = (): boolean => {
    const selectedDate = moment(selected);
    const todaysDate = moment(todayDate);
    return selectedDate.isSame(todaysDate, "day");
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
      <CalendarProvider date={selected}>
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
                  pathname: "/bookAppointment",
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
        <ExpandableCalendar
          firstDay={1}
          disableMonthChange={true}
          disableAllTouchEventsForDisabledDays={true}
          date={selected}
          initialDate={todayDate.toDateString()}
          initialPosition={Positions.CLOSED}
          onDayPress={handleDaySelect}
          closeOnDayPress={true}
          disableWeekScroll
          disabledByWeekDays={[]}
          minDate={todayDate.toDateString()}
          calendarStyle={{}}
          markedDates={marked}
          allowShadow
          animateScroll
          scrollEnabled={false}
          theme={{}}
        />

        {!checkSelectedDateIsToday() && (
          <Pressable
            style={{
              backgroundColor: "red",
              width: 180,
              borderRadius: 10,
              elevation: 1,
            }}
            onPress={resetDate}
          >
            <View
              style={{
                justifyContent: "center",
                flexDirection: "row",
                alignItems: "center",
                paddingHorizontal: 15,
                paddingVertical: 10,
                gap: 5,
              }}
            >
              <MaterialCommunityIcons name="update" color={"white"} size={20} />
              <Text style={{ color: "white", fontFamily: "AmulyaRegular" }}>Volver al dia de hoy</Text>
            </View>
          </Pressable>
        )}
        <FlatList
          ListHeaderComponentStyle={{ marginVertical: 5 }}
          ListHeaderComponent={() => (
            <Text style={{ fontFamily: "AmulyaMedium", fontSize: 16 }}>
              {checkSelectedDateIsToday() ? "Tus citas de hoy" : `Tus citas del ${selected}`}
            </Text>
          )}
          data={[
            { customer: "Manuel", hora: "12:00 PM" },
            { customer: "Manuel", hora: "12:00 PM" },
          ]}
          renderItem={({ item }) => <AppointmentCard info={item} />}
        />
      </CalendarProvider>
      {/* <Agenda
        // The list of items that have to be displayed in agenda. If you want to render item as empty date
        // the value of date key has to be an empty array []. If there exists no value for date key it is
        // considered that the date in question is not yet loaded
        showOnlySelectedDayItems
        items={{
          "2025-05-29": [{ name: "item 2 - any js object", height: 80, day: todayDate.toDateString() }],
          "2025-05-25": [],
        }}
        // Callback that gets called when items for a certain month should be loaded (month became visible)
        loadItemsForMonth={(month) => {
          console.log("trigger items loading");
        }}
        // Callback that fires when the calendar is opened or closed
        onCalendarToggled={(calendarOpened) => {
          console.log(calendarOpened);
        }}
        // Callback that gets called on day press
        onDayPress={(day) => {
          setSelected(day.dateString);
          console.log("day pressed");
        }}
        // Callback that gets called when day changes while scrolling agenda list
        onDayChange={(day) => {
          console.log("day changed");
        }}
        // Initially selected day
        selected={selected}
        // Minimum date that can be selected, dates before minDate will be grayed out. Default = undefined
        minDate={todayDate.toDateString()}
        // Maximum date that can be selected, dates after maxDate will be grayed out. Default = undefined
        // maxDate={todayDate.setDate(todayDate.getDate() + 6).toString()}
        // Max amount of months allowed to scroll to the past. Default = 50
        pastScrollRange={50}
        // Max amount of months allowed to scroll to the future. Default = 50
        futureScrollRange={50}
        // Specify how each item should be rendered in agenda
        renderItem={(item, firstItemInDay) => {
          return (
            <View>
              <Text>Hola</Text>
            </View>
          );
        }}
        // Specify how each date should be rendered. day can be undefined if the item is not first in that day
        renderDay={(day, item) => {
          return (
            <View>
              <Text>hola</Text>
            </View>
          );
        }}
        // Specify how empty date content with no items should be rendered
        renderEmptyDate={() => {
          return (
            <View>
              <ActivityIndicator />
            </View>
          );
        }}
        // Specify how agenda knob should look like
        // renderKnob={() => {
        //   return <View />;
        // }}
        // Override inner list with a custom implemented component
        renderList={(listProps) => {
          //TODO: Crear lista que solo muestre los elementos del dia seleccionado
          return (
            <FlatList
              ListHeaderComponentStyle={{ marginVertical: 5 }}
              ListHeaderComponent={() => (
                <Text style={{ fontFamily: "AmulyaMedium", fontSize: 16 }}>
                  {selected === todayDate.toDateString()
                    ? "Tus citas de hoy"
                    : `Tus citas del ${new Date(selected).toLocaleDateString()}`}
                </Text>
              )}
              data={[
                { customer: "Manuel", hora: "12:00 PM" },
                { customer: "Manuel", hora: "12:00 PM" },
              ]}
              renderItem={({ item }) => <AppointmentCard info={item} />}
            />
          );
        }}
        // Specify what should be rendered instead of ActivityIndicator
        renderEmptyData={() => {
          return (
            <View>
              <Text>Sin datos</Text>
            </View>
          );
        }}
        // Specify your item comparison function for increased performance
        // rowHasChanged={(r1, r2) => {
        //   return r1.text !== r2.text;
        // }}
        // Hide knob button. Default = false
        hideKnob={false}
        // When `true` and `hideKnob` prop is `false`, the knob will always be visible and the user will be able to drag the knob up and close the calendar. Default = false
        showClosingKnob={true}
        // By default, agenda dates are marked if they have at least one item, but you can override this if needed
        markedDates={{
          "2025-06-01": { selected: false, marked: true },
        }}
        // If disabledByDefault={true} dates flagged as not disabled will be enabled. Default = false
        disabledByDefault={true}
        // If provided, a standard RefreshControl will be added for "Pull to Refresh" functionality. Make sure to also set the refreshing prop correctly
        onRefresh={() => console.log("refreshing...")}
        // Set this true while waiting for new data from a refresh
        refreshing={false}
        // Add a custom RefreshControl component, used to provide pull-to-refresh functionality for the ScrollView
        refreshControl={null}
        // Agenda theme
        theme={{
          agendaDayTextColor: "yellow",
          agendaDayNumColor: "green",
          agendaTodayColor: "red",
          agendaKnobColor: "blue",
        }}
        // Agenda container style
        style={{}}
      /> */}
    </View>
  );
}
