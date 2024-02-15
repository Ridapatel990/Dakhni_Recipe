import React from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { ImageURISource } from "react-native";
import IncDecComponent from "./common/IncDecComponent";
import DropDownList from "./DropDownList";

interface RecipeChipProps {
  title?: string;
  image?: string;
  component?: string;
  dropdowncomp?: string;
  cookingTime?: number;
  setCookingTime?: any;
}

const Assets: { [key: string]: ImageURISource } = {
  clock: require("../assets/ClockIcon.png"),
  serves: require("../assets/ServesIcon.png"),
  category: require("../assets/CategoryStar.png"),
};

const RecipeChipComponenet: React.FC<RecipeChipProps> = ({
  title,
  image,
  component,
  dropdowncomp,
  cookingTime,
  setCookingTime,
}) => {
  return (
    <View>
      <View style={styles.mainView}>
        <View style={{ flexDirection: "row", left: 5 }}>
          {image && (
            <Image source={Assets[image]} style={{ marginTop: 11 }}></Image>
          )}
          <Text style={styles.text}>{title}</Text>
        </View>
        <View style={{ marginRight: 5, width: 100 }}>
          {component && (
            <IncDecComponent
              cookingTime={cookingTime}
              setCookingTime={setCookingTime}
            ></IncDecComponent>
          )}
          <View style={{ alignSelf: "flex-end", marginRight: 15 }}>
            {dropdowncomp && <DropDownList></DropDownList>}
          </View>
        </View>
      </View>
      <View style={{ alignSelf: "flex-end", width: "80%" }}></View>
    </View>
  );
};
const styles = StyleSheet.create({
  mainView: {
    flexDirection: "row",
    backgroundColor: "rgba(220, 220, 220, 0.4)",
    justifyContent: "space-between",
    width: "90%",
    height: 60,
    alignSelf: "center",
    borderRadius: 9,
    marginBottom: 10,
  },
  text: {
    fontWeight: "300",
    alignSelf: "center",
    // marginTop:3,
    paddingLeft: 5,
  },
});

export default RecipeChipComponenet;
