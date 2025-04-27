import { StyleSheet, Text, View } from "react-native";
import React from "react";
import DatetimePicker from "@react-native-community/datetimepicker";
import RNDateTimePicker from "@react-native-community/datetimepicker";
const Calendar = () => {
  return (
    <DatetimePicker
      display="compact"
      value={new Date()}
      mode="datetime"
      minimumDate={new Date()}
    />
  );
};

export default Calendar;

const styles = StyleSheet.create({});
