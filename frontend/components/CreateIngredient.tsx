import React, { useEffect, useState } from "react";
import {
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";
import BigButton from "./common/BigButton";
import { useGetAll } from "../hooks";
import {
  GetIngredientInterface,
  IngredientInterface,
  InputIngredientInterface,
} from "../interfaces";

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
interface CreateIngredientProps {
  setIngrediants: (list: Array<InputIngredientInterface>) => void;
}
const CreateIngredient: React.FC<CreateIngredientProps> = ({
  setIngrediants,
}) => {
  const [inputIngredients, setInputIngredients] = useState<
    Array<InputIngredientInterface>
  >([intialIngredient]);

  const [ingredientList, setIngredientList] = useState<
    Array<GetIngredientInterface>
  >([]);

  useEffect(()=>{
    setIngrediants(inputIngredients)
    console.log("calledddddddddddddd")
  },[inputIngredients])
  useGetAll({
    key: "/recipes/ingredient/",
    onSuccess: (data) => {
      setIngredientList(data);
    },
  });

  return (
    <View>
      {inputIngredients.map((item: InputIngredientInterface, index: number) => (
        <View style={styles.container} key={index}>
          <Dropdown
            style={styles.dropdown}
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
            value={item.name}
            onChange={(selectedIngredient: GetIngredientInterface) => {
              const updatedIngredients = [...inputIngredients];
              updatedIngredients[index] = {
                ...updatedIngredients[index],
                name: selectedIngredient.name,
              };
              setInputIngredients(updatedIngredients);
            }}
          />

          <TextInput
            style={styles.quantity}
            keyboardType="numeric"
            value={item.quantity}
            onChangeText={(text) => {
              const updatedIngredients = [...inputIngredients];
              updatedIngredients[index] = {
                ...updatedIngredients[index],
                quantity: text,
              };
              setInputIngredients(updatedIngredients);
            }}
          />

          <Dropdown
            style={styles.dropdown}
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
            placeholder="Unit"
            value={item.name}
            onChange={(selectedUnit: any) => {
              const updatedIngredients = [...inputIngredients];
              updatedIngredients[index] = {
                ...updatedIngredients[index],
                unit: selectedUnit.title,
              };
              setInputIngredients(updatedIngredients);
            }}
          />

          {index === inputIngredients.length - 1 ? (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                setInputIngredients([...inputIngredients, intialIngredient]);
              }}
            >
              <Image source={require("../assets/Increment.png")} />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={{ alignSelf: "center" }}
              onPress={() => {
                const updatedIngredients = [...inputIngredients];
                updatedIngredients.splice(index, 1);
                setInputIngredients(updatedIngredients);
              }}
            >
              <Image source={require("../assets/Decrement.png")} />
            </TouchableOpacity>
          )}
        </View>
      ))}

      <View
        style={{
          flexDirection: "column",
          height: 100,
          alignSelf: "center",
          marginTop: 10,
        }}
      >
        <BigButton
          btnLabel={"Save"}
          btnHeight={50}
          btnWidth={90}
          btnBorder={10}
        />
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
    // marginBottom:30
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
