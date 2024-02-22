import React, { useState } from "react";
import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
import InputField from "../components/common/InputField";
import RecipeChipComponent from "../components/RecipeChipComponent";
import CustomTabs from "../components/common/CustomTabs";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CreateProcedure, {
  ProcedureDataType,
} from "../components/CreateProcedure";
import CreateIngredient from "../components/CreateIngredient";
import * as ImagePicker from "react-native-image-picker";
import { InputIngredientInterface } from "../interfaces";
import BigButton from "../components/common/BigButton";
import { useCreateOrUpdate } from "../hooks";

interface postDataInterface {
  name: string;
  serve_qty: string;
  cooking_time: string;
  category: Array<string>;
  ingredients: Array<InputIngredientInterface>;
  procedure: Array<ProcedureDataType>;
}

const RecipeCreatePage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [postData, setPostData] = useState<postDataInterface>({
    name: "",
    serve_qty: "0",
    cooking_time: "0",
    category: [],
    ingredients: [],
    procedure: [],
  });

  const [longTabText, setLongTabText] = useState<string | undefined>(undefined);
  const [image, setImage] = useState<string | undefined>("");
  const [selectedCategory, setSelectedCategory] = useState<Array<string>>([]);
  const { mutate } = useCreateOrUpdate({
    url: "/recipes/create/",
    onSuccess() {
      navigation.navigate("HomeScreen");
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });
  const handleCookingTimeChange = (text: string) => {
    setPostData((prevData) => ({
      ...prevData,
      cooking_time: text,
    }));
  };

  const handleServeQtyTimeChange = (text: string) => {
    setPostData((prevData) => ({
      ...prevData,
      serve_qty: text,
    }));
  };
  const handleSetInredients = (list: Array<InputIngredientInterface>) => {
    setPostData((prevData) => ({
      ...prevData,
      ingredients: list,
    }));
  };
  const handleSetProcedures = (list: Array<ProcedureDataType>) => {
    setPostData((prevData) => ({
      ...prevData,
      procedure: list,
    }));
  };
  // const selectImage = async () => {
  //   let result = await ImagePicker.launchImageLibrary({
  //     mediaType: "photo",
  //   });

  //   if (!result.didCancel) {
  //     setImage(result.uri);
  //   }
  // };
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: "photo",
    });

    if (!result.didCancel) {
      setImage(image);
    }
  };

  const handleSubmit = () => {
    setPostData((prevData) => ({
      ...prevData,
      category: selectedCategory,
    }));
    // console.log(postData, "DATA TO POST ");
    mutate(postData);
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
                  />
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
            <InputField
              style={{ marginRight: 0, marginLeft: 0 }}
              onChangeText={(text: string) =>
                setPostData((prevData) => ({
                  ...prevData,
                  name: text,
                }))
              }
            />
          </View>
        </View>
        <View style={{ bottom: 20 }}>
          <RecipeChipComponent
            time={parseInt(postData.cooking_time)}
            increaseTime={() =>
              handleCookingTimeChange(
                (parseInt(postData.cooking_time) + 1).toString()
              )
            }
            decreaseTime={() =>
              handleCookingTimeChange(
                (parseInt(postData.cooking_time) - 1).toString()
              )
            }
            onChangeText={handleCookingTimeChange}
            image="clock"
            title="Cook Time(Min)"
            component="{component}"
          ></RecipeChipComponent>
          <RecipeChipComponent
            time={parseInt(postData.serve_qty)}
            increaseTime={() =>
              handleServeQtyTimeChange(
                (parseInt(postData.serve_qty) + 1).toString()
              )
            }
            decreaseTime={() =>
              handleServeQtyTimeChange(
                (parseInt(postData.serve_qty) - 1).toString()
              )
            }
            onChangeText={handleServeQtyTimeChange}
            image="serves"
            title="Serves"
            component="{component}"
          ></RecipeChipComponent>
          {/* <RecipeChipComponent
            createCategory="{createCategory}"
            setSelectedCategory={setSelectedCategory}
            image="category"
          ></RecipeChipComponent> */}
          <RecipeChipComponent
            setSelectedCategory={setSelectedCategory}
            image="category"
            // title="Category"
            dropdowncomp="{dropdowncomp}"
          ></RecipeChipComponent>
        </View>

        <View
          style={{
            flexDirection: "row",
            alignSelf: "center",
            marginBottom: 10,
            width: "100%",
            marginLeft: 30,
            zIndex: -1,
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

        <View style={{ flexDirection: "column", marginLeft: 10 }}>
          {longTabText === "Ingredients" ? (
            <CreateIngredient
              setIngrediants={(list: Array<InputIngredientInterface>) =>
                handleSetInredients(list)
              }
            />
          ) : (
            <CreateProcedure
              setProcedure={(list: Array<ProcedureDataType>) =>
                handleSetProcedures(list)
              }
            />
          )}
        </View>
        <View
          style={{
            flexDirection: "column",
            height: 100,
            alignSelf: "center",
            marginTop: 20,
          }}
        >
          <BigButton
            Press={() => handleSubmit()}
            btnLabel={"Save"}
            btnHeight={50}
            btnWidth={90}
            btnBorder={10}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export default RecipeCreatePage;

// import React from "react";
// import { useState } from "react";
// import * as ImagePicker from "react-native-image-picker";
// import { View, Image, Text, TouchableOpacity, ScrollView } from "react-native";
// import InputField from "../components/common/InputField";
// import RecipeChipComponent from "../components/RecipeChipComponent";
// import CustomTabs from "../components/common/CustomTabs";
// import { NavigationProp, ParamListBase } from "@react-navigation/native";
// import CreateProcedure from "../components/CreateProcedure";
// import CreateIngredient from "../components/CreateIngredient";

// interface postDataInterface {
//   name: string;
//   server_qty: number | string;
//   cooking_time: string;
//   category: Array<string>;
//   ingredients: Array<{ name: string; quantity: string; unit?: string }>;
//   procedure: Array<{ procedure: number; description: string }>;
// }
// const RecipeCreatePage = ({
//   navigation,
// }: {
//   navigation: NavigationProp<ParamListBase>;
// }) => {
//   const onItemTapped = (index: number) => {
//     switch (index) {
//       case 0:
//         navigation.navigate("HomeScreen");
//         break;
//       case 1:
//         navigation.navigate("SavedRecipePage");
//         break;
//       case 3:
//         navigation.navigate("NotificationPage");
//         break;
//       case 4:
//         navigation.navigate("AccountPage");
//         break;

//       default:
//         break;
//     }
//   };

//   const [postData, setPostData] = useState<postDataInterface>({
//     name: "",
//     server_qty: "",
//     cooking_time: "",
//     category: [],
//     ingredients: [],
//     procedure: [],
//   });
//   const [longTabText, setLongTabText] = useState<string | undefined>(undefined);
//   const [cookingTime, setCookingTime] = useState<number>(0);
//   const [serveQty, setServeQty] = useState<number>(0);
//   const [_, setSelectedCategory] = useState<Array<string>>([]);

//   const handleCookingTimeChange = (text: string) => {
//     const timeValue = parseInt(text) || 0;
//     setCookingTime(timeValue);
//   };

//   const handleServeQtyTimeChange = (text: string) => {
//     const timeValue = parseInt(text) || 0;
//     setServeQty(timeValue);
//   };

//   let list;
//   if (longTabText === "Ingredients") {
//     list = (
//       <View style={{ marginBottom: 30, zIndex: -1 }}>
//         <CreateIngredient></CreateIngredient>
//       </View>
//     );
//   } else {
//     list = (
//       <View style={{ zIndex: -1 }}>
//         <CreateProcedure></CreateProcedure>
//       </View>
//     );
//   }
//   const [image, setImage] = useState<string | undefined>("");
//   //   interface OptionsCommon {
//   //     mediaType: ImagePicker.MediaType;
//   // }
//   //   const imageOptions:OptionsCommon ={

//   //   }
//   const selectImage = async () => {
//     let result = await ImagePicker.launchImageLibrary({
//       mediaType: "photo",
//       // mediaTypes: ImagePicker.MediaTypeOptions.Images,
//       // allowsEditing: true,
//       // aspect: [4, 3],
//       // quality: 1,
//     });

//     if (!result.didCancel) {
//       // console.log(result);
//       setImage(image);
//     }
//   };

//   // console.log(createCategory);
//   console.log(cookingTime);

//   return (
//     <View>
//       <ScrollView style={{ height: "100%" }}>
//         <View
//           style={{ flexDirection: "column", width: "100%", marginBottom: 60 }}
//         >
//           <View
//             style={{
//               marginTop: 9,
//               backgroundColor: "rgba(220, 220, 220, 0.4)",
//               width: "90%",
//               height: 300,
//               justifyContent: "center",
//               alignSelf: "center",
//               borderRadius: 10,
//             }}
//           >
//             <TouchableOpacity onPress={selectImage}>
//               <View style={{ alignSelf: "center" }}>
//                 {image ? (
//                   <Image
//                     source={{ uri: image }}
//                     style={{ width: 400, height: 400 }}
//                   />
//                 ) : (
//                   <Image
//                     source={require("../assets/UploadIcon.png")}
//                     style={{ alignSelf: "center" }}
//                   ></Image>
//                 )}
//                 <Text
//                   style={{
//                     alignSelf: "center",
//                     fontSize: 13,
//                     fontWeight: "200",
//                   }}
//                 >
//                   Upload Image
//                 </Text>
//               </View>
//             </TouchableOpacity>
//           </View>

//           <View style={{ width: "100%", paddingHorizontal: 20 }}>
//             <InputField style={{ marginRight: 0, marginLeft: 0 }}></InputField>
//           </View>
//         </View>
//         <View style={{ bottom: 20 }}>
//           <RecipeChipComponent
//             time={cookingTime}
//             increaseTime={() => setCookingTime((prev: number) => prev + 1)}
//             decreaseTime={() => setCookingTime((prev: number) => prev - 1)}
//             onChangeText={handleCookingTimeChange}
//             image="clock"
//             title="Cook Time(Min)"
//             component="{component}"
//           ></RecipeChipComponent>
//           <RecipeChipComponent
//             time={serveQty}
//             increaseTime={() => setServeQty((prev: number) => prev + 1)}
//             decreaseTime={() => setServeQty((prev: number) => prev - 1)}
//             onChangeText={handleServeQtyTimeChange}
//             image="serves"
//             title="Serves"
//             component="{component}"
//           ></RecipeChipComponent>
//           <RecipeChipComponent
//             setSelectedCategory={setSelectedCategory}
//             image="category"
//             // title="Category"
//             dropdowncomp="{dropdowncomp}"
//           ></RecipeChipComponent>

//           {/* <DropDownList></DropDownList> */}
//         </View>

//         <View
//           style={{
//             flexDirection: "row",
//             alignSelf: "center",
//             marginBottom: 10,
//             width: "100%",
//             marginLeft: 30,
//             zIndex: -1,
//           }}
//         >
//           <CustomTabs
//             defaultSelected={true}
//             label={"Ingredients"}
//             width={"44%"}
//             height={42}
//             margin={4}
//             selected={longTabText}
//             setSelected={setLongTabText}
//           ></CustomTabs>

//           <CustomTabs
//             label={"Procedure"}
//             width={"44%"}
//             height={42}
//             margin={4}
//             selected={longTabText}
//             setSelected={setLongTabText}
//           ></CustomTabs>
//         </View>

//         <View style={{ flexDirection: "column", marginLeft: 10 }}>{list}</View>

//         {/* <View style={{ flexDirection: "column", marginLeft: 10 }}>{list}</View> */}

//         {/* <View style={{ marginTop: 70 }}>
//         <BottomNavigationBar
//           onItemTapped={onItemTapped}
//           selectedIndex={0}
//         ></BottomNavigationBar>
//       </View> */}
//       </ScrollView>
//     </View>
//     // {/* </View> */}
//   );
// };
// export default RecipeCreatePage;
