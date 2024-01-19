import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import SimpleCard from "../components/home/SimpleCard";
import { useGetAll } from "../hooks";
import { GetNewInteface } from "../interfaces";

const SeeAllNewRecipe = () => {
  const { data: newRecipe } = useGetAll({
    key: "recipes/list/",
    enabled: true,
  });
  return (
    <View>
      <Text style={styles.header}>New Recipes</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginLeft: 30,
            marginRight: 30,
          }}
        >
          {newRecipe && newRecipe.length
            ? newRecipe?.map((recipe: GetNewInteface) => (
                <SimpleCard
                  label={recipe.name}
                  imageUri={recipe.image1}
                ></SimpleCard>
              ))
            : ""}
        </View>
      </ScrollView>
    </View>
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
});

export default SeeAllNewRecipe;
