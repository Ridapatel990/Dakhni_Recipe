import React from "react";
import { useState } from "react";
import * as ImagePicker from "react-native-image-picker";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import InputField from "../components/common/InputField";
import RecipeChipComponenet from "../components/RecipeChipComponent";
import BigButton from "../components/common/BigButton";
import CustomChips from "../components/common/CustomChips";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownList from "../components/DropDownList";
import CustomTabs from "../components/common/CustomTabs";
import Procedure from "../components/Procedure";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Ingredient from "../components/Ingredient";
import IngredientsList from "../components/IngredientList";
import CreateProcedure from "../components/CreateProcedure";
import CreateIngredient from "../components/CreateIngredient";

const RecipeCreatePage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const onItemTapped = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate("HomeScreen");
        break;
      case 1:
        navigation.navigate("SavedRecipePage");
        break;
      case 3:
        navigation.navigate("NotificationPage");
        break;
      case 4:
        navigation.navigate("AccountPage");
        break;

      default:
        break;
    }
  };

  const [longTabText, setLongTabText] = useState<string | undefined>(undefined);
  const [cookingTime, setCookingTime] = useState<number>(0);

  let list;
  if (longTabText === "Ingredients") {
    list = (
      <View style={{ marginBottom: 30,zIndex:-1 }}>
        <CreateIngredient></CreateIngredient>
      </View>
    );
  } else {
    list =  <View style={{zIndex:-1 }}>
            <CreateProcedure></CreateProcedure>
            </View>
  }
  const [image, setImage] = useState<string | undefined>("");
  //   interface OptionsCommon {
  //     mediaType: ImagePicker.MediaType;
  // }
  //   const imageOptions:OptionsCommon ={

  //   }
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    if (!result.didCancel) {
      // console.log(result);
      setImage(image);
    }
  };

  return (
    <View>
      <ScrollView style={{ height: "100%" }}>
        <View
          style={{ flexDirection: "column", width: "100%", marginBottom: 60 }}
        >
          <View
            style={{
              marginTop: 9,
              backgroundColor: "rgba(220, 220, 220, 0.4)",
              width: "90%",
              height: 300,
              justifyContent: "center",
              alignSelf: "center",
              borderRadius: 10,
            }}
          >
            <TouchableOpacity onPress={selectImage}>
              <View style={{ alignSelf: "center" }}>
                {image ? (
                  <Image
                    source={{ uri: image }}
                    style={{ width: 400, height: 400 }}
                  />
                ) : (
                  <Image
                    source={require("../assets/UploadIcon.png")}
                    style={{ alignSelf: "center" }}
                  ></Image>
                )}
                <Text
                  style={{
                    alignSelf: "center",
                    fontSize: 13,
                    fontWeight: "200",
                  }}
                >
                  Upload Image
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          <View style={{ width: "100%", paddingHorizontal: 20 }}>
            <InputField style={{ marginRight: 0, marginLeft: 0 }}></InputField>
          </View>
        </View>
        <View style={{ bottom: 20 }}>
          <RecipeChipComponenet
            cookingTime={cookingTime}
            setCookingTime={setCookingTime}
            image="clock"
            title="Cook Time(Min)"
            component="{component}"
          ></RecipeChipComponenet>
          <RecipeChipComponenet
            image="serves"
            title="Serves"
            component="{component}"
          ></RecipeChipComponenet>
          <RecipeChipComponenet
            image="category"
            // title="Category"
            dropdowncomp="{dropdowncomp}"
          ></RecipeChipComponenet>
         
          <DropDownList></DropDownList>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: 10,
            width: "100%",
            marginLeft: 30,
            zIndex:-1
          }}
        >
          <CustomTabs
            defaultSelected={true}
            label={"Ingredients"}
            width={"44%"}
            height={42}
            margin={4}
            selected={longTabText}
            setSelected={setLongTabText}
          ></CustomTabs>

          <CustomTabs
            label={"Procedure"}
            width={"44%"}
            height={42}
            margin={4}
            selected={longTabText}
            setSelected={setLongTabText}
          ></CustomTabs>
        </View>

        <View style={{ flexDirection: "column", marginLeft: 10 }}>{list}</View>

        {/* <View style={{ flexDirection: "column", marginLeft: 10 }}>{list}</View> */}

        {/* <View style={{ marginTop: 70 }}>
        <BottomNavigationBar
          onItemTapped={onItemTapped}
          selectedIndex={0}
        ></BottomNavigationBar>
      </View> */}
      </ScrollView>
    </View>
    // {/* </View> */}
  );
};
export default RecipeCreatePage;
