import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ToastAndroid,
} from "react-native";
import React from "react";
import InputField from "../components/common/InputField";
import BigButton from "../components/common/BigButton";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { useCreateOrUpdate } from "../hooks";
import { Controller, useForm } from "react-hook-form";

const ResetPassPage = ({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { email } = route.params as { email: string };

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const { mutate } = useCreateOrUpdate({
    url: "/accounts/change-password/",
    onSuccess(data, variables) {
      // console.log(data, "<======");
      navigation.navigate("SignInPage");
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });

  const onSubmit = () => {
    const formValues = getValues();
    if (formValues?.password !== formValues?.confirm_password) {
      ToastAndroid.show("Both Passwords must match", ToastAndroid.SHORT);
      return;
    }
    mutate({ email: email, password: formValues?.password });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Choose new Password</Text>
        <Text style={styles.text2}>
          Almost done. Enter your new password and you are all set.
        </Text>
      </View>

      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              textforInput={"Enter new password"}
              placeholder={""}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name={"password"}
          rules={{ required: "Password is required", minLength: 4 }}
        />

        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              textforInput={"Confirm new password"}
              placeholder={"password"}
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
          name={"confirm_password"}
          rules={{
            required: "Confirm Password is required",
            validate: (value) =>
              value === getValues("password") || "Passwords do not match",
          }}
        />
      </View>

      <View>
        <BigButton
          btnLabel={"Reset Password"}
          btnWidth={300}
          btnPosition="relative"
          marginTop={40}
          btnHeight={60}
          btnBorder={8}
          Press={() => onSubmit()}
        ></BigButton>
      </View>
    </SafeAreaView>
  );
};

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

export default ResetPassPage;
