import { View, Text, SafeAreaView, ScrollView, StyleSheet } from "react-native";
import React from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import Card from "../components/home/Card";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useGetAll } from "../hooks";
import { RecipeInterface } from "../interfaces";

const SavedRecipePage = ({
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

  const { data: savedRecipes } = useGetAll({
    key: "/social/saved-recipe/list/",
    enabled: true,
    onSuccess(data) {
      // console.log("onSuccessonSuccessonSuccess", data);
    },
    onError(err) {
      // console.log("ERRRIRIRIRIRI", err);
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.savedText}>Saved Recipes</Text>
      </View>

      <ScrollView
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
                  Rating={item.recipe.rate}
                ></Card>
              ))
            : ""}
        </View>
      </ScrollView>

      {/* <BottomNavigationBar onItemTapped={onItemTapped} selectedIndex={0} /> */}
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

  // squareImage: {
  //   // flexDirection: 'row',
  //   marginTop: 30,
  //   height: 40,

  // },

  // overLayImg: {
  //   // flexDirection: 'row',
  //   marginTop: 30,
  //   height: 40,
  //   // position: 'absolute',
  //   // top: 50,
  //   // left: 50,

  // }
});

export default SavedRecipePage;
