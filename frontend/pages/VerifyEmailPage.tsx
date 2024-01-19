import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import BigButton from "../components/common/BigButton";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import OtpInputBox from "../components/OtpInputBox";
import { useCreateOrUpdate } from "../hooks";

const VerifyEmailPage = ({
  route,
  navigation,
}: {
  route: RouteProp<ParamListBase>;
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { email } = route.params as { email: string };

  const [otp, setOtp] = useState(["", "", "", ""]);

  const { mutate } = useCreateOrUpdate({
    url: "/accounts/verify-otp/",
    onSuccess(data, variables) {
      console.log(data, "<======");
      navigation.navigate("ResetPassPage", { email: variables?.email });
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });

  const onSubmit = () => {
    let isEmpty = otp?.some((item) => !item);
    console.log(isEmpty, "<=====isEmptyyy", otp);

    if (isEmpty) {
      ToastAndroid.show("Please fill the otp", ToastAndroid.SHORT);
      return;
    }

    mutate({ email: email, otp: +otp?.join("") });

    // navigation.navigate("ResetPassPage");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.headerText}>Verify your email</Text>
        <Text style={styles.text2}>
          Enter the 4 digit code sent to your email id
        </Text>
      </View>

      <View>
        {/* <InputField textforInput={''} placeholder={'Enter Email'}></InputField> */}
        <OtpInputBox otp={otp} setOtp={setOtp}></OtpInputBox>
      </View>

      <View>
        <BigButton
          btnLabel={"Verify email"}
          btnWidth={300}
          btnPosition="relative"
          marginTop={40}
          Press={() => onSubmit()}
          btnHeight={60}
          btnBorder={8}
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

export default VerifyEmailPage;
