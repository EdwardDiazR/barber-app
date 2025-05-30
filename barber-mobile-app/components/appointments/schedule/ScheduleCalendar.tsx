import React from "react";
import { Calendar } from "react-native-calendars";
import { DateData, MarkedDates } from "react-native-calendars/src/types";

interface CalendarProps {
  selectedDate: string;
  todaysDate: Date;
  markedAppointmentDates: MarkedDates;
  handleSelectDate: (date: DateData) => void;
}
const ScheduleCalendar = ({ selectedDate, handleSelectDate, markedAppointmentDates, todaysDate }: CalendarProps) => {
  const MAX_DAYS: number = 6;
  const futureDate = new Date(todaysDate); //Indicates the max date of making appointments
  futureDate.setDate(todaysDate.getDate() + MAX_DAYS);
  return (
    <Calendar
      date={selectedDate}
      current={selectedDate}
      state="today"
      firstDay={1}
      monthFormat="MMMM yyyy"
      minDate={todaysDate.toDateString()}
      maxDate={futureDate.toString()}
      enableSwipeMonths
      hideExtraDays
      markingType="dot"
      markedDates={markedAppointmentDates}
      onDayPress={handleSelectDate}
      style={{
        backgroundColor: "white",
        borderRadius: 20,
        flexGrow: 0,
        padding: 0,
      }}
      theme={{
        nowIndicatorKnob: {},
        selectedDayTextColor: "red",
        // todayBackgroundColor: "orange",
        todayTextColor: "orange",
        selectedDayBackgroundColor: "green",

        textDayStyle: {
          color: "black",
          fontSize: 14,
          textAlign: "center",
        },
      }}
    />
  );
};

export default ScheduleCalendar;
