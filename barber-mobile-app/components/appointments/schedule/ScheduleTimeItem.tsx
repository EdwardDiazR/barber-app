import React, { useEffect } from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
const TimeItem = ({
  item,
  isSelected,
  handleSelectTime,
  selectedTime,
}: {
  item: { time: string; label: string; available: boolean };
  isSelected: boolean;
  selectedTime: string | null;
  handleSelectTime: (time: string | null) => void;
}) => {
  const isTimeAvailable: boolean = item.available;

  const setTextColor = () => {
    if (isTimeAvailable && !isSelected) return "black";
    if (isTimeAvailable && isSelected) return "white";
    if (!isTimeAvailable) return "gray";
  };
  const setBgColor = () => {
    if (isTimeAvailable && !isSelected) return "white";
    if (isTimeAvailable && isSelected) return "#1B1212";
    if (!isTimeAvailable) return "white";
  };

  const setBorderColor = () => {
    if (isTimeAvailable && !isSelected) return "#1c6e8c";
    if (isTimeAvailable && isSelected) return "#1B1212";
    if (!isTimeAvailable) return "gray";
  };

  useEffect(() => {
    if (item.time === selectedTime && !isTimeAvailable) handleSelectTime(null);
  }, [isTimeAvailable]);

  return (
    <Animated.View style={{ margin: 1.5 }}>
      <Pressable
        disabled={!isTimeAvailable}
        onPress={() => {
          handleSelectTime(item.time);
        }}
        style={[
          {
            borderWidth: 1.5,
            borderColor: setBorderColor(),
            borderRadius: 15,
            alignItems: "center",
            justifyContent: "center",
            elevation: isSelected ? 5 : 0,
            backgroundColor: setBgColor(),
            height: 43,
            opacity: isTimeAvailable ? 1 : 0.6,
          },
        ]}
      >
        <Animated.Text
          style={{
            fontSize: 15,
            color: setTextColor(),
            fontFamily:'AmulyaMedium'
          }}
        >
          {item.label}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default TimeItem;
