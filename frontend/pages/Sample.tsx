import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';
import InputField from '../components/common/InputField';
import Input from '@ant-design/react-native/lib/input-item/Input';

const Sample = () => {
  const [inputFields, setInputFields] = useState<any>([]);

  const addInputField = () => {
    setInputFields([...inputFields, '']);
  };

  // const handleInputChange = (text, index) => {
  //   const updatedFields = [...inputFields];
  //   updatedFields[index] = text;
  //   setInputFields(updatedFields);
  // };

  return (
    <View>
      {/* {inputFields.map((value, index) => (
        <Input
          
          key={index}
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          placeholder={`Input ${index + 1}`}
        />
      ))} */}
      <TouchableOpacity onPress={addInputField}>
        <Text>Add Input Field</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Sample;
