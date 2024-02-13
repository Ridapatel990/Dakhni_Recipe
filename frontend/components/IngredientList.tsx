import { View, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Ingredient from "./Ingredient";
import { IngredientInterface } from "../interfaces";

const IngredientsList = ({
  data,
}: {
  data: IngredientInterface[] | undefined;
}) => {
  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <ScrollView
        style={{
          flexDirection: "column",
          maxWidth: "100%",
          paddingVertical: 10,
        }}
      >
        <View style={{ margin: 20 }}>
          {data && data?.length > 0
            ? data?.map((value: any) => {
                return (
                  <Ingredient
                    key={value?.id}
                    name={value?.name}
                    image="rice"
                    quantity={value?.quantity}
                  ></Ingredient>
                );
              })
            : ""}
          {/* <Ingredient
            name="Chicken"
            image="chicken"
            quantity="200g"
          ></Ingredient>
          <Ingredient name="Egg" image="egg" quantity="10"></Ingredient>
          <Ingredient name="Tomatoes" image="tomato" quantity="5"></Ingredient> */}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  header: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    margin: 10,
  },

  todayText: {
    fontWeight: "300",
    fontSize: 12,
    color: "black",
    alignSelf: "center",
    //   margin: 10,
  },
});

export default IngredientsList;
