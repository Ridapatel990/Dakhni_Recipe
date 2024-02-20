import React, { useState } from "react";
import {
  Image,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import InputField from "./InputField";

interface IncDecComponentProps {
  time?: number;
  decreaseTime?: ()=>void;
  increaseTime?: ()=>void;
  onChangeText?: (text: string)=> void;
}

const IncDecComponent: React.FC<IncDecComponentProps> = ({
  time=0,
  decreaseTime,
  increaseTime,
  onChangeText
}) => {
  //   const [count, setCount] = useState(0);

  

  const Increment = () => {
    if (increaseTime) {
      increaseTime()
    }
  };

  const Decrement = () => {
    if (time > 0 && decreaseTime) {
      decreaseTime()
    }
  };
  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 11,
        }}
      >
        <TouchableOpacity style={{ alignSelf: "center" }} onPress={Increment}>
          <Image source={require("../../assets/Increment.png")}></Image>
        </TouchableOpacity>
        <TextInput
          value={time.toString()}
          onChangeText={(text) => {
            if (onChangeText){
              onChangeText(text)
            }
          }}
          keyboardType={"numeric"}
          style={styles.input}
        ></TextInput>

        <TouchableOpacity style={{ alignSelf: "center" }} onPress={Decrement}>
          <Image source={require("../../assets/Decrement.png")}></Image>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    height: 40,
    // margin: 12,
    borderWidth: 1,
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderColor: "#FC1125",
    borderRadius: 10,
    fontSize: 15,
    textAlign: "center",
  },
});
export default IncDecComponent;
