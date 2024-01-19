import React, { useState } from "react";
import { View, TextInput, StyleSheet } from "react-native";

const OtpInputBox = ({
  otp,
  setOtp,
}: {
  otp: string[];
  setOtp: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
  const handleOtpChange = (index: number, value: string) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = value;
    setOtp(updatedOtp);
  };

  return (
    <View style={styles.container}>
      {otp.map((value, index) => (
        <TextInput
          key={index}
          style={styles.inputBox}
          onChangeText={(text) => {
            if (text.length <= 1) {
              handleOtpChange(index, text);
            }
          }}
          value={value}
          keyboardType="numeric"
          maxLength={1}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    margin: 20,
  },
  inputBox: {
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "black",
    width: 40,
    height: 40,
    textAlign: "center",
    margin: 10,
    fontSize: 20,
  },
});

export default OtpInputBox;
