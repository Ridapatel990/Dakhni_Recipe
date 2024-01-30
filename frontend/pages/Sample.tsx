import Input from '@ant-design/react-native/lib/input-item/Input';
import React, { useState } from 'react';
  import { StyleSheet, Text, TextInput, View } from 'react-native';
  import { Dropdown } from 'react-native-element-dropdown';
  import InputField from '../components/common/InputField';
import DropDownList from '../components/DropDownList';


  const data1 = [
    { label: 'Beef', value: '1' },
    { label: 'Chicken', value: '2' },
    { label: 'Tomato', value: '3' },
    { label: 'Rice', value: '4' },
    { label: 'Potato', value: '5' },
  ];

  const data2 = [
    { label: 'Grams', value: '1' },
    { label: 'Kilograms', value: '2' },
    { label: 'Litres', value: '3' },
    
  ];

  const DropdownComponent = () => {
    const [value, setValue] = useState<string | null>(null);
    const [isFocus, setIsFocus] = useState(false);

    const renderLabel1 = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'black' }]}>
            
          </Text>
        );
      }
      return null;
    };

    const renderLabel2 = () => {
      if (value || isFocus) {
        return (
          <Text style={[styles.label, isFocus && { color: 'black' }]}>
            
          </Text>
        );
      }
      return null;
    };

    return (
      <View style={styles.container}>
        {/* {renderLabel1()}
        <Dropdown
          style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          iconStyle={styles.iconStyle}
          data={data1}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Ingredient'
          searchPlaceholder="Search..."
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
          
        />
        
        <TextInput style={styles.quantity}></TextInput>
        {renderLabel2()}
         <Dropdown
          style={[styles.dropdown2, isFocus && { borderColor: 'gray' }]}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          iconStyle={styles.iconStyle}
          data={data2}
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder='Grams'
          value={value}
          onFocus={() => setIsFocus(true)}
          onBlur={() => setIsFocus(false)}
          onChange={item => {
            setValue(item.value);
            setIsFocus(false);
          }}
        /> */}
        
      </View>
    );
  };

  export default DropdownComponent;

  const styles = StyleSheet.create({
    container: {
      width:'100%',
      padding: 16,
      alignContent:'center',
      marginRight:100,
      flexDirection:"row",
      borderRadius:10,
    },
    dropdown: {
      height: 50,
      width:110,
      borderColor: 'red',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },

    dropdown2: {
      height: 50,
      width:110,
      borderColor: 'red',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
      marginRight:10
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
      zIndex: 999,
      paddingHorizontal: 8,
      fontSize: 14,
    },
    placeholderStyle: {
      fontSize: 16,
    },
    selectedTextStyle: {
      fontSize: 16,
    },
    iconStyle: {
      width: 20,
      height: 20,
    },
    inputSearchStyle: {
      height: 40,
      fontSize: 16,
    },
  quantity:{
  borderColor:'red',
  width:70,
  height:50,
  borderWidth:0.5,
  borderRadius:10,
  marginLeft:10,
  marginRight:10
}
  });




  