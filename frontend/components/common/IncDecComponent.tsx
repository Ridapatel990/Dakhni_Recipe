import React from "react";
import { Image, TextInput, TouchableOpacity, View,StyleSheet } from "react-native";
import InputField from "./InputField";

const IncDecComponent = () =>{
    return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:11}}> 
                <TouchableOpacity style={{alignSelf:'center'}}>
                    <Image source={require('../../assets/Increment.png')}></Image>
                </TouchableOpacity>
                <TextInput style={styles.input}></TextInput>
                <TouchableOpacity style={{alignSelf:'center'}}>
                    <Image source={require('../../assets/Decrement.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
      height:30,
      // margin: 12,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderColor: '#FC1125',
      borderRadius: 10,
    }
})
export default IncDecComponent;