import { View, Text, TextInput, StyleSheet, DimensionValue } from 'react-native'
import React from 'react'

interface InputField {
    textforInput?: string;
    placeholder?: string;
    height?:DimensionValue
    // keyboardType: string;
    [x:string]: any;

    // Press?: () => void;
  }

  

const InputField: React.FC<InputField> = ({textforInput, placeholder,height,...otherProps}) => {


  const styles = StyleSheet.create({
    
    input: {
      height:height,
      // margin: 12,
      borderWidth: 1,
      marginLeft: 30,
      marginRight: 30,
      padding: 10,
      borderColor: '#FC1125',
      borderRadius: 10,
      
      
    },

    inputText: {
      marginLeft: 10,
      marginTop: 15,
      paddingLeft: 20,
      lineHeight: 27,
      color: 'black',

    }
  })

  return (

    

    <View>
        <Text style={styles.inputText}>{textforInput}</Text>
        <TextInput  {...otherProps} style={{...styles.input,...otherProps?.style}} placeholder= {placeholder} />

        
    </View>
  )

  
}



export default InputField