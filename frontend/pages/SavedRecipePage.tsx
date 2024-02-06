import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback } from "react";
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
} from "@react-navigation/native";
import Card from "../components/home/Card";
import { RecipeInterface } from "../interfaces";
import { serverAPI } from "../utils";

const SavedRecipePage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [savedRecipes, setSavedRecipes] = useState([]);

  const getRecipeData = async () => {
    const res = await serverAPI.get("/social/saved-recipe/list/");
    setSavedRecipes(res?.data?.rows);
  };

  useFocusEffect(
    React.useCallback(() => {
      getRecipeData();
    }, [])
  );

  const [isRefreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    await getRecipeData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.savedText}>Saved Recipes</Text>
      </View>

      <ScrollView
        refreshControl={
          <RefreshControl refreshing={isRefreshing} onRefresh={onRefresh} />
        }
        horizontal={false}
        style={{
          flexDirection: "column",
          maxWidth: "100%",
          paddingVertical: 10,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            flexWrap: "wrap",
            margin: 10,
            paddingBottom: 70,
          }}
        >
          {savedRecipes && savedRecipes.length
            ? savedRecipes.map((item: { recipe: RecipeInterface }) => (
                <Card
                  key={item.recipe.id}
                  CardName={item.recipe.name}
                  imageUri={item.recipe.image1}
                  // Rating={item.recipe.rate}
                  Rating={item.recipe.rate}
                ></Card>
              ))
            : ""}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  savedText: {
    fontWeight: "500",
    fontSize: 20,
    color: "black",
    alignSelf: "center",
    margin: 10,
  },

  welcomeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    marginLeft: 10,
    paddingLeft: 20,
  },
});

export default SavedRecipePage;
