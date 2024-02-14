import {
  View,
  Text,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import React, { useState, useCallback, useEffect } from "react";
import {
  NavigationProp,
  ParamListBase,
  useFocusEffect,
  useIsFocused,
} from "@react-navigation/native";
import Card from "../components/home/Card";
import { useGetAll } from "../hooks";
import { GetRecipeInteface, RecipeInterface } from "../interfaces";
import { serverAPI } from "../utils";

const FilterResponse = ({
  route,
  navigation,
}: {
  route: any;
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

  const isFocused = useIsFocused();

  const [recipes, setRecipes] = useState([]);

  useFocusEffect(() => {
    if (isFocused) {
      // console.log("In focusedddddd");
    }
  });

  const [isRefreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    // getRecipeData();
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  useEffect(() => {
    if (route.params?.rows && route.params?.rows.length) {
      // console.log("inside filter", route.params?.rows);
      setRecipes(route.params?.rows);
    }
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text style={styles.savedText}>Filtered Recipes</Text>
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
          {recipes.map((item: GetRecipeInteface) => (
            <Card
              key={item.id}
              CardName={item.name}
              imageUri={item.image1}
              Rating={item?.rate}
            ></Card>
          ))}
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

export default FilterResponse;
