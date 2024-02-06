import {
  View,
  Text,
  SafeAreaView,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React from "react";
import LGradient from "react-native-linear-gradient";
import Icon from "react-native-vector-icons/Ionicons";
import MaskedView from "@react-native-masked-view/masked-view";
import BigButton from "../components/common/BigButton";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
// import Sample from "./Sample";
import RecipeDescription from "./RecipeDescription";
import LinearGradient from "react-native-linear-gradient";
import RecipeCreatePage from "./RecipeCreatePage";

// import Rating from './Rating';

const LandingPage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const handleButtonPress = () => {};

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageBackground
          source={require("../assets/homeimage.png")}
          style={styles.imageBackground}
        >
          <View style={{ marginTop: 20 }}>
            <Text style={styles.imageText}>
              <Text>Eat </Text>

              <Text style={{ color: "#FC1125" }}>Better</Text>
            </Text>
            <Text style={styles.imageText2}>every day!</Text>
          </View>

          <View style={{ width: "70%" }}>
            <Text style={styles.imageText3}>Simple way to find </Text>
            <Text style={styles.imageText4}>Tasty Recipe</Text>
          </View>
        </ImageBackground>

        <BigButton
          btnLabel={"Start Cooking"}
          btnWidth={240}
          Press={() => navigation.navigate("SignInPage")}
          btnPosition={"absolute"}
          btnHeight={60}
          btnBorder={8}
        />
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imageContainer: {
    flex: 1,
  },
  imageBackground: {
    flex: 1,
    resizeMode: "cover",
    // justifyContent: 'center',
  },
  imageText: {
    fontSize: 50,
    lineHeight: 60,
    fontWeight: "300",
    color: "white",
    textAlign: "left",
    verticalAlign: "top",
    marginLeft: 20,
  },

  imageText2: {
    fontSize: 50,
    lineHeight: 60,
    fontWeight: "300",
    color: "white",
    textAlign: "left",
    verticalAlign: "top",
    marginLeft: 20,
  },

  imageText3: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    verticalAlign: "auto",
    marginTop: 20,
    // paddingRight: 30,
    // marginRight: 30
  },

  imageText4: {
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "400",
    color: "white",
    textAlign: "center",
    verticalAlign: "auto",
    marginTop: 10,
    // paddingRight: 30,
    // marginRight: 30
  },

  gradient: {
    display: "flex",
    flexDirection: "row",
    overflow: "hidden",
  },
  gradientText: {
    fontSize: 20,
    // fontWeight: '400',
    lineHeight: 27,
    fontWeight: "bold",
    textAlign: "center",
  },

  button: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    height: 54,
    width: 240,
    // display:'flex',
    // flexDirection:'row',
    // justifyContent:'center'
    textAlign: "center",
  },
  buttonGradient: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: "center",
  },

  buttonContent: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "white",
    fontWeight: "500",
    fontSize: 18,
    marginRight: 8,
    textAlign: "center",
  },
  buttonIcon: {
    marginLeft: 5,
  },
});

export default LandingPage;
