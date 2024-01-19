
import React, { useEffect } from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

interface CustomChipsProps {
  label: string;
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
  defaultSelected?: boolean; 
  
}

const CustomChips: React.FC<CustomChipsProps> = ({ label, selected,setSelected, disabled = false, defaultSelected= false }) => {

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

  return (
    <TouchableOpacity
      style={[styles.chip, { backgroundColor: chipColor ,borderColor: selected !== label ? 'red':'white'}]}
      onPress={handlePress}
      disabled={disabled}
    >
      <Text style={[styles.label, { color: labelColor }]}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  chip: {
    width: 'auto',
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth:1,
    marginTop:5,
    
  },
  label: {
    fontWeight: '300',
    fontSize: 12,
  },
});

export default CustomChips;
