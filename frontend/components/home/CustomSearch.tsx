import React from "react";
import { View, TextInput, StyleSheet, DimensionValue } from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/Ionicons";

interface CustomSearchBar {
  value: string;
  placeholder: string;
  onChangeText: any;
  barWidth: DimensionValue;
  // Press?: () => void;
  onFocus?: any;
  onBlur?: any;
}

const CustomSearchBar: React.FC<CustomSearchBar> = ({
  placeholder,
  onChangeText,
  value,
  barWidth,
  onFocus,
  onBlur,
}) => {
  const styles = StyleSheet.create({
    container: {
      borderWidth: 1,
      borderColor: "#FC1125",
      borderRadius: 8,
      margin: 10,
      width: barWidth,
      height: 40,
      marginTop: 30,
      flexDirection: "row",
      alignItems: "center",
      marginLeft: 0,
    },
    searchInput: {
      // paddingHorizontal: 10,
      fontSize: 16,
      color: "black",
      flex: 1,
      paddingBottom: 9,
    },

    searchIcon: {
      marginLeft: 10,
    },
  });
  return (
    <View style={styles.container}>
      <Ionicons
        name="search"
        size={24}
        color="#aaa"
        style={styles.searchIcon}
      />
      <TextInput
        placeholder={placeholder}
        style={styles.searchInput}
        onChangeText={onChangeText}
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholderTextColor="#aaa"
      />
    </View>
  );
};

export default CustomSearchBar;
