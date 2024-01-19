import React from "react";
import { useState } from "react";
import { ImageBackground, Text, View  } from "react-native";
import RNPickerSelect from 'react-native-picker-select';


const DropDownList =() =>{
    const [selectedValue,setSelectedValue] = useState('null')
    return(
        <View>
           
            {/* <Picker
        selectedValue={selectedValue}
        onValueChange={(itemValue:any) => setSelectedValue(itemValue)}
      >
        <Picker.Item label="Select an option" value={null} />
        <Picker.Item label="Option 1" value="option1" />
        <Picker.Item label="Option 2" value="option2" />
        <Picker.Item label="Option 3" value="option3" />
      </Picker> */}
      <ImageBackground source={require('../assets/whiteBackground.png')}>
      <RNPickerSelect
            onValueChange={(value:any) => console.log(value)}
            items={[
                { label: 'Football', value: 'football' },
                { label: 'Baseball', value: 'baseball' },
                { label: 'Hockey', value: 'hockey' },
            ]}
        /></ImageBackground>
        </View>
    )
}
export default DropDownList;