import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import InputField from "../components/common/InputField";
import BigButton from "../components/common/BigButton";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { useCreateOrUpdate } from "../hooks";
import { Controller, useForm } from "react-hook-form";

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerText: {
    fontWeight: "500",
    color: "black",
    textAlign: "left",
    padding: 20,
    marginLeft: 10,
    fontSize: 20,
  },
  text2: {
    textAlign: "left",
    paddingLeft: 20,
    marginLeft: 10,
    fontSize: 14,
    color: "black",
  },
});

const ForgotPassPage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate } = useCreateOrUpdate({
    url: "/accounts/sent-otp/",
    onSuccess(_, variables) {
      navigation.navigate("VerifyEmailPage", { email: variables?.email });
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });

  const forgotPassword = async () => {
    const formValues = getValues();
    if (!formValues["email"]) {
      ToastAndroid.show("Please enter email", ToastAndroid.SHORT);
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const email = formValues["email"];
    if (reg.test(email) === false) {
      ToastAndroid.show("Invalid format for email!!", ToastAndroid.SHORT);
      return;
    }

    mutate(formValues);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Forgot Password?</Text>
        <Text style={styles.text2}>
          Enter The email address associated with your account
        </Text>
      </View>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              textforInput={"Email"}
              placeholder={"Enter Email"}
              value={value}
              onChangeText={onChange}
            />
          )}
          name="email"
          rules={{ required: "Email is required" }}
        />
      </View>

      <View>
        <BigButton
          btnLabel={"Confirm"}
          btnWidth={300}
          btnPosition="relative"
          marginTop={40}
          Press={forgotPassword}
          btnHeight={null}
        ></BigButton>
      </View>
    </SafeAreaView>
  );
};

export default ForgotPassPage;
