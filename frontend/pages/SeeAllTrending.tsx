import { View, Text, StyleSheet, ScrollView } from "react-native";
import React from "react";
import { useGetAll } from "../hooks";
import { GetPopularInterface } from "../interfaces";
import BigCard from "../components/common/BigCard";
import { NavigationProp,ParamListBase } from "@react-navigation/native";

const SeeAllNewRecipe = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const { data: trendingRecipe } = useGetAll({
    key: "recipes/trending-recipes/list/",
    enabled: true,
  });

  return (
    <View>
      <Text style={styles.header}>Trending Recipes</Text>
      <ScrollView>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            marginLeft: 20,
            marginRight: 20,
          }}
        >
          {trendingRecipe && trendingRecipe.length
            ? trendingRecipe?.map((trendRecipe: GetPopularInterface) => (
                <BigCard
                  BigCardName={trendRecipe?.recipe?.name}
                  imageUri={trendRecipe?.recipe?.image1}
                  Rating={trendRecipe?.recipe?.rate}
                  time={trendRecipe?.recipe?.cooking_time}
                  recipeId={trendRecipe.id}
                  Press={()=> navigation.navigate("RecipeDescription",
                  {id:trendRecipe?.recipe?.id}
                  )}
                ></BigCard>
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
