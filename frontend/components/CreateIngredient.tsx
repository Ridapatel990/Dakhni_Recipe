import Input from "@ant-design/react-native/lib/input-item/Input";
import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import InputField from "../components/common/InputField";
import BigButton from "./common/BigButton";
import { useGetAll } from "../hooks";
import {
  GetIngredientInterface,
  InputIngredientInterface,
} from "../interfaces";

const data1 = [
  { label: "Beef", value: "1" },
  { label: "Chicken", value: "2" },
  { label: "Tomato", value: "3" },
  { label: "Rice", value: "4" },
  { label: "Potato", value: "5" },
];
//   <TextInput style={styles.quantity}></TextInput>

//   {/* {renderLabel2()} */}
//    <Dropdown
//     style={[styles.dropdown2, isFocus && { borderColor: 'red' }]}
//     itemTextStyle={{color:'black'}}
//     placeholderStyle={styles.placeholderStyle}
//     selectedTextStyle={styles.selectedTextStyle}
//     iconStyle={styles.iconStyle}
//     data={data2}
//     search
//     searchPlaceholder='Search...'
//     maxHeight={300}
//     labelField="title"
//     valueField="value1"
//     placeholder='Grams'
//     value={value1}
//     onFocus={() => setIsFocus(true)}
//     onBlur={() => setIsFocus(false)}
//     onChange={item => {
//       setValue1(item.value1);
//       setIsFocus(false);
//     }}

//   />

//   <TouchableOpacity style={{alignSelf:'center'}}>
//   <Image source={require('../assets/Increment.png')}></Image>
//   </TouchableOpacity>

// </View>

const data2 = [
  { title: "Grams", value1: "8" },
  { title: "Kilograms", value1: "9" },
  { title: "Litres", value1: "10" },
];

const intialIngredient: InputIngredientInterface = {
  name: null,
  quantity: "",
  unit: "",
};

const CreateIngredient = () => {
  const [value1, setValue1] = useState<string | null>(null);
  const [isFocus, setIsFocus] = useState(false);
  const [inputIngredients, setInputIngredients] = useState<
    Array<InputIngredientInterface>
  >([intialIngredient]);

  const [ingredientList, setIngredientList] = useState<
    Array<GetIngredientInterface>
  >([]);

  useGetAll({
    key: "/recipes/ingredient/",
    onSuccess: (data) => {
      console.log(data, "<=========ngredient datat");
      setIngredientList(data);
    },
  });

  // const renderLabel1 = () => {
  //   if (value || isFocus) {
  //     return (
  //       <Text style={[styles.label1, isFocus && { color: 'black' }]}>

  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  // const renderLabel2 = () => {
  //   if (value1 || isFocus) {
  //     return (
  //       <Text style={[styles.label2, isFocus && { color: 'black' }]}>

  //       </Text>
  //     );
  //   }
  //   return null;
  // };

  return (
    <View>
      {inputIngredients.map((item: InputIngredientInterface, index: number) => (
        <View style={styles.container}>
          {/* {renderLabel1()} */}

          <Dropdown
            style={[styles.dropdown, isFocus && { borderColor: "gray" }]}
            itemTextStyle={{ color: "black" }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            inputSearchStyle={styles.inputSearchStyle}
            iconStyle={styles.iconStyle}
            data={ingredientList}
            search
            maxHeight={300}
            labelField="name"
            valueField="name"
            placeholder="Ingredient"
            searchPlaceholder="Search..."
            // value={ingredient.name}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: GetIngredientInterface) => {
              let arr = [...inputIngredients];
              arr[index] = { ...arr[index], name: item.name };
              setInputIngredients(arr);
            }}
          />

          {/* <View style={{bottom:35,width:120}}>
        <InputField height={50}></InputField>
        </View> */}

          <TextInput
            style={styles.quantity}
            keyboardType="numeric"
            value={String(item.quantity)}
            onChangeText={(text) => {
              let arr = [...inputIngredients];
              arr[index] = { ...arr[index], quantity: text };
              setInputIngredients(arr);
            }}
          ></TextInput>

          {/* {renderLabel2()} */}
          <Dropdown
            style={[styles.dropdown2, isFocus && { borderColor: "gray" }]}
            itemTextStyle={{ color: "black" }}
            placeholderStyle={styles.placeholderStyle}
            selectedTextStyle={styles.selectedTextStyle}
            iconStyle={styles.iconStyle}
            data={data2}
            search
            searchPlaceholder="Search..."
            maxHeight={300}
            labelField="title"
            valueField="value1"
            placeholder="Grams"
            value={value1}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={(item: any) => {
              let arr = [...inputIngredients];
              arr[index] = { ...arr[index], unit: item.title };
              setInputIngredients(arr);
            }}
          />

          {index + 1 == inputIngredients.length ? (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                setInputIngredients((prev) => [...prev, intialIngredient]);
              }}
            >
              <Image source={require("../assets/Increment.png")}></Image>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                let newArr = [...inputIngredients];
                console.log(newArr, index);
                newArr.splice(index, 1);
                console.log(newArr);
                setInputIngredients(newArr);
              }}
            >
              <Image source={require("../assets/Decrement.png")}></Image>
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View
        style={{ flexDirection: "column", height: 100, alignSelf: "center" }}
      >
        <BigButton
          btnLabel={"Save"}
          btnHeight={50}
          btnWidth={90}
          btnBorder={10}
        ></BigButton>
      </View>
    </View>
  );
};

export default CreateIngredient;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 10,
    paddingVertical: 15,
    flexDirection: "row",
    borderRadius: 10,
  },
  dropdown: {
    height: 50,
    width: 115,
    borderColor: "red",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },

  dropdown2: {
    height: 50,
    width: 115,
    borderColor: "red",
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginRight: 10,
  },
  icon: {
    marginRight: 5,
  },
  label1: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  label2: {
    position: "absolute",
    backgroundColor: "white",
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  quantity: {
    borderColor: "red",
    width: 60,
    textAlign: "center",
    height: 50,
    borderWidth: 0.5,
    borderRadius: 10,
    marginLeft: 10,
    marginRight: 10,
  },
});
