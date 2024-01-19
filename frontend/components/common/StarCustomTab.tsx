import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
  Image,
  SafeAreaView,
  ImageURISource,
} from "react-native";
// import React from 'react'
import React, { useEffect, useState } from "react";

interface CustomTabsProps {
  label: string;
  width: DimensionValue;
  height?: DimensionValue;
  margin: DimensionValue;
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
  defaultSelected?: boolean;
  image?: string;
  tabBorderColor?: string;
}

const Assets: { [key: string]: ImageURISource } = {
  star: require("../../assets/gradientstar.png"),
  share: require("../../assets/ShareIcon.png"),
  rate: require("../../assets/blackStar.png"),
  review: require("../../assets/Review.png"),
};
const StarCustomTab: React.FC<CustomTabsProps> = ({
  label,
  width,
  height = 30,
  margin,
  selected,
  setSelected,
  disabled = false,
  defaultSelected = false,
  image,
  tabBorderColor,
}) => {
  const chipColor =
    selected === label ? "#FC1125" : disabled ? "grey" : "white";
  const labelColor = selected === label || disabled ? "white" : "black";
  // console.log(image)

  const handlePress = () => {
    if (!disabled) {
      setSelected(label);
      // Logic
    }
  };

  useEffect(() => {
    // Set the first tab as selected by default when the component mounts
    if (defaultSelected) {
      setSelected(label);
    }
  }, []);

  const styles = StyleSheet.create({
    tabs: {
      marginRight: 4,
      zIndex: 3,
      bottom: 5,
      flexDirection: "row",
      width: width,
      justifyContent: "space-evenly",
      borderRadius: 10,
      borderWidth: 1,
      height: height,
      // borderColor: '#FC1125',
    },
    labelText: {
      color: "black",
      fontWeight: "300",
      fontSize: 11,
      alignSelf: "flex-end",
      margin: 5,
    },
  });
  return (
    <TouchableOpacity
      style={[
        styles.tabs,
        {
          backgroundColor: chipColor,
          borderColor:
            selected !== label
              ? tabBorderColor
                ? tabBorderColor
                : "red"
              : "white",
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <View style={{ overflow: "hidden", borderRadius: 10, zIndex: 10 }}>
        <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
      </View>
      <View style={{ alignSelf: "flex-start", marginTop: 5 }}>
        {image && <Image source={Assets[image]}></Image>}
      </View>
      {/* </View> */}
    </TouchableOpacity>
  );
};

export default StarCustomTab;
