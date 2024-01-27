/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React from "react";
import InputField from "../components/common/InputField";
import BigButton from "../components/common/BigButton";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "./SignUpPage";
import { useForm, Controller } from "react-hook-form";
import { useCreateOrUpdate } from "../hooks";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setApiHeaders } from "../utils/setApiHeaders";
import { UserInterface } from "../interfaces";

const SignInPage = ({
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
    url: "/accounts/login/",
    onSuccess: async (response) => {
      // console.log(response.data["token"]);
      await AsyncStorage.setItem("userToken", response.data["token"]);
      await AsyncStorage.setItem("user", JSON.stringify(response.data["user"]));
      setApiHeaders();
      ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
      navigation.reset({
        routes: [{ name: "BottomBarContainer" }],
        index: 0,
      });
    },
  });

  const onSubmit = () => {
    const data = getValues();
    // console.log("<========submittt data", data);
    if (!data["email"] || !data["password"]) {
      ToastAndroid.show(
        "Please enter email and password!!",
        ToastAndroid.SHORT
      );
      return;
    }
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w\w+)+$/;
    const email = data["email"];
    if (reg.test(email) === false) {
      ToastAndroid.show("Invalid format for email!!", ToastAndroid.SHORT);
      return;
    }

    mutate(data);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.helloText}>Hello,</Text>
        <Text style={styles.welcomeText}>Welcome back!</Text>
      </View>

      <View style={{ marginTop: 20 }}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textforInput={"Email"}
              placeholder={"Enter email"}
            />
          )}
          name="email"
          rules={{ required: "Email is required" }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              textforInput={"Password"}
              placeholder={"Enter Password"}
              secureTextEntry={true}
            />
          )}
          name="password"
          rules={{ required: "Password is required" }}
        />
      </View>

      <TouchableOpacity>
        <View>
          <Text
            style={styles.forgotText}
            onPress={() => navigation.navigate("ForgotPassPage")}
          >
            Forgot Password?
          </Text>
        </View>
      </TouchableOpacity>

      <BigButton
        btnLabel={"Sign In"}
        btnWidth={300}
        btnPosition={"relative"}
        marginTop={40}
        btnBorder={8}
        btnHeight={60}
        Press={() => onSubmit()}
      />

      <TouchableOpacity style={styles.gButton}>
        <Image source={require("../assets/gbutton.png")} />
      </TouchableOpacity>

      <View style={styles.bottomText}>
        <Text>Don’t have an account? </Text>
        <TouchableOpacity>
          <Text
            style={styles.signUpText}
            onPress={() => navigation.navigate("SignUpPage")}
          >
            Sign up
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  helloText: {
    fontSize: 30,
    // lineHeight: 40,
    fontWeight: "500",
    color: "black",
    textAlign: "left",
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    marginLeft: 10,
  },

  welcomeText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    marginLeft: 10,
    paddingLeft: 20,
  },

  forgotText: {
    textAlign: "left",
    marginLeft: 10,
    paddingLeft: 20,
    marginTop: 10,
    fontWeight: "400",
    fontSize: 14,
    color: "#FC1125",
    textDecorationLine: "underline",
  },

  gButton: {
    alignSelf: "center",
  },

  bottomText: {
    flexDirection: "row",
    alignSelf: "center",
    marginTop: 10,
  },

  signUpText: {
    color: "#FC1125",
    textDecorationLine: "underline",
  },
});

export default SignInPage;
