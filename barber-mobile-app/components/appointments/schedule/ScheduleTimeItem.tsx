import React from "react";
import { Pressable } from "react-native";
import Animated from "react-native-reanimated";
const TimeItem = ({
  item,
  isSelected,
  handleSelectTime,
}: {
  item: { time: string; label: string; available: boolean };
  isSelected: boolean;
  handleSelectTime: (time: string) => void;
}) => {
  const isTimeAvailable: boolean = item.available;

  const setTextColor = () => {
    if (isTimeAvailable && !isSelected) return "black";
    if (isTimeAvailable && isSelected) return "white";
    if (!isTimeAvailable) return "gray";
  };
  const setBgColor = () => {
    if (isTimeAvailable && !isSelected) return "white";
    if (isTimeAvailable && isSelected) return "red";
    if (!isTimeAvailable) return "white";
  };

  const setBorderColor = () => {
    if (isTimeAvailable && !isSelected) return "#1c6e8c";
    if (isTimeAvailable && isSelected) return "red";
    if (!isTimeAvailable) return "lightgray";
  };
  //   const progress = useSharedValue(isSelected ? 1 : 0);
  //   const animatedStyle = useAnimatedStyle(() => {
  //     const backgroundColor = interpolateColor(
  //       progress.value,
  //       [0, 1],
  //       ["#EEEEEE", "#1E90FF"] // de gris claro a azul
  //     );

  //     const textColor = interpolateColor(
  //       progress.value,
  //       [0, 1],
  //       ["#000000", "#FFFFFF"] // de negro a blanco
  //     );
  //   });

  return (
    <Animated.View style={{ margin: 1.5 }}>
      <Pressable
        disabled={!isTimeAvailable}
        onPress={() => {
          handleSelectTime(item.time);
        }}
        style={[
          {
            borderWidth: 1.3,
            borderColor: setBorderColor(),
            borderRadius: 12,
            alignItems: "center",
            justifyContent: "center",
            elevation: isSelected ? 5 : 0,
            backgroundColor: setBgColor(),
            height: 42,
          },
        ]}
      >
        <Animated.Text
          style={{
            fontSize: 16,
            color: setTextColor(),
            fontWeight: "medium",
          }}
        >
          {item.label}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default TimeItem;
