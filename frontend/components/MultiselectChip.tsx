import React, { useEffect } from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";

interface CustomChipsProps {
//   label1: string;
  data: {name:string;id:string}
  tabSelected: {id:string;name:string}[];
  setTabSelected: React.Dispatch<React.SetStateAction<{id:string;name:string}[]>>;
  disabled?: boolean;
  defaultSelected?: boolean;
  onPress?: () => void;
}

const CustomChips: React.FC<CustomChipsProps> = ({
//   label1,
data,
  tabSelected,
  setTabSelected,
  disabled = false,
  defaultSelected = false,
  onPress = null,
}) => {
    const isSelected = tabSelected.some((item:any) => item?.id === data?.id);
    // const isSelected = tabSelected.includes(data?.id);
    console.log(tabSelected,"hhhhhhhhhhhh")
    const chipColor = isSelected ? "red" : disabled ? "red" : "white";
    const labelColor = isSelected || disabled ? "white" : "black";
  
    const handlePress = () => {
      if (!disabled) {
        if (isSelected) {
          // If already selected, remove from selected list
          setTabSelected(tabSelected.filter((item:any) => item?.id !== data?.id));
        } else {
          // If not selected, add to selected list
          setTabSelected([...tabSelected, data]);
        }
      }
    };

  useEffect(() => {
    // Set the first tab as selected by default when the component mounts
    if (defaultSelected && setTabSelected) {
        setTabSelected((prev) => [...prev, data]);
    }
  }, []);

  return (
    <TouchableOpacity
      style={[
        styles.chip,
        {
          backgroundColor: chipColor,
          borderColor: isSelected ? "red" : "red",
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text
        style={[
          styles.label,
          {
            color: labelColor,
            fontWeight: isSelected ? "500" : "300",
          },
        ]}
      >
        {data?.name}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    width: "auto",
    height: 30,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    marginTop: 5,
    paddingBottom: 2,
  },
  label: {
    fontWeight: "300",
    fontSize: 12,
  },
});

export default CustomChips;
