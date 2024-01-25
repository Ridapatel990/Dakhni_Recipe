import React, { useState } from "react";
import { Image, TextInput, TouchableOpacity, View,StyleSheet } from "react-native";
import InputField from "./InputField";




const IncDecComponent = () =>{

    const [count,setCount] = useState(0);

const Increment = () =>{
    setCount(count + 1)
}

const Decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
}
    return(
        <View>
            <View style={{flexDirection:'row',justifyContent:'space-between',marginTop:11}}> 
                <TouchableOpacity style={{alignSelf:'center'}} onPress={Increment}>
                    <Image source={require('../../assets/Increment.png')}></Image>
                
                </TouchableOpacity>
                <TextInput
                value={count.toString()} 
                onChangeText={(text) => setCount(parseInt(text) || 0 )}
                keyboardType={"numeric"} 
                style={styles.input}>
                </TextInput>

                <TouchableOpacity style={{alignSelf:'center'}} onPress={Decrement}>
                    <Image source={require('../../assets/Decrement.png')}></Image>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    input:{
      height:40,
      // margin: 12,
      borderWidth: 1,
      marginLeft: 10,
      marginRight: 10,
      padding: 10,
      borderColor: '#FC1125',
      borderRadius: 10,
      fontSize:15,
      textAlign:'center'
    }
})
export default IncDecComponent;