import { View, Text, TouchableOpacity, StyleSheet, DimensionValue } from 'react-native'
// import React from 'react'
import React, { useEffect } from 'react';


interface CustomTabsProps {
    label: string;
    width: DimensionValue;
    height: DimensionValue;
    margin: DimensionValue;
    selected: string | undefined;   
    setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabled?: boolean;
    defaultSelected?: boolean; 
  }

const CustomTabs : React.FC<CustomTabsProps> = ({label, width, height, margin, selected,setSelected, disabled = false, defaultSelected = false, }) => {
    const chipColor = selected === label ? '#FC1125' : disabled ? 'grey' : 'white';
  const labelColor = selected === label || disabled ? 'white' : 'black';



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
  }, [])

    const styles = StyleSheet.create({
        tabs:{
            borderRadius: 10,
            justifyContent: 'center',
            alignItems: 'center',
            margin: margin,
            paddingLeft: 8,
            paddingRight: 8,
            borderWidth:1,
            width: width,
            height: height,
            borderColor: '#FC1125'
        },
        labelText: {
            color: 'black',
            fontWeight: '300',
            fontSize: 12,

        }
    })
  return (
    <TouchableOpacity style={[styles.tabs, {backgroundColor: chipColor, borderColor: selected !== label ? 'red':'white'}]} onPress={handlePress}
    disabled={disabled}>
        <Text style={[styles.labelText, {color: labelColor}]}>{label}</Text>
    </TouchableOpacity>
  )
}

export default CustomTabs