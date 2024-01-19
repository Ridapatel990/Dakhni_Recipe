/* eslint-disable prettier/prettier */
/* eslint-disable quotes */
/* eslint-disable react/self-closing-comp */
/* eslint-disable react-native/no-inline-styles */
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect } from "react";
import CustomSearchBar from "../components/home/CustomSearch";
import FilterButton from "../components/home/FilterButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CustomChips from "../components/common/CustomChips";
import DetailedCard from "../components/home/DetailedCard";
import Icon from "react-native-vector-icons/Ionicons";
import CustomTabs from "../components/common/CustomTabs";
import SimpleCard from "../components/home/SimpleCard";
import { useGetAll } from "../hooks";
import {
  CategoryInterface,
  GetNewInteface,
  GetPopularInterface,
  GetRecipeInteface,
  UserInterface,
} from "../interfaces";
import BigCard from "../components/common/BigCard";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SeeAllNewRecipe from "./SeeAllNewRecipe";

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tabText, setTabText] = useState<string | undefined>(undefined);
  const [chipText, setChipText] = useState<string | undefined>(undefined);
  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  const handleSearch = (text: string) => {
    //logic
    setSearchText(text);
  };
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

  const { data: popularCategories } = useGetAll({
    key: "/portal/popular-categories/",
    enabled: true,
  });
  const { data: allCategories } = useGetAll({
    key: "/portal/category/",
    enabled: true,
  });

  const { data: getRecipe } = useGetAll({
    key: "/recipes/list/?random=true",
    enabled: true,
  });

  const { data: popularCat } = useGetAll({
    key: "recipes/popular-recipes/list/?q=kebabs",
    enabled: true,
  });

  const { data: newRecipe } = useGetAll({
    key: "recipes/list/",
    enabled: true,
  });

  const { data: trendingRecipe } = useGetAll({
    key: "recipes/trending-recipes/list/",
    enabled: true,
  });

  // console.log("qwertyuiopojhdsafgnm", getRecipe);
  const getUser = async () => {
    const user: UserInterface | undefined = JSON.parse(
      (await AsyncStorage.getItem("user")) || ""
    );
    if (user) {
      setUser(user);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ marginBottom: 10 }}
      >
        <View style={{ marginLeft: 20 }}>
          <View>
            <Text style={styles.helloText}>Hello {user?.name || "Tulip"},</Text>
            <Text style={styles.welcomeText}>
              Welcome to the recipe paradise!
            </Text>
          </View>

          <View style={{ flexDirection: "column", position: "relative" }}>
            <View style={{ flexDirection: "row" }}>
              <CustomSearchBar
                value={searchText}
                placeholder={"Search"}
                onChangeText={() => handleSearch}
                barWidth={"70%"}
              ></CustomSearchBar>

              <FilterButton
                btnWidth={40}
                Press={() => navigation.navigate("FilterPage")}
              ></FilterButton>
            </View>

            <ScrollView
              horizontal={true}
              style={{
                flexDirection: "row",
                maxWidth: "100%",
                paddingVertical: 10,
              }}
            >
              {allCategories && allCategories.length
                ? allCategories.map((cat: CategoryInterface, index: number) => (
                    <CustomChips
                      key={cat.id}
                      label={cat.name}
                      selected={chipText}
                      setSelected={setChipText}
                      defaultSelected={index == 0}
                    ></CustomChips>
                  ))
                : ""}
            </ScrollView>

            <ScrollView horizontal={true}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20,
                  marginTop: 10,
                }}
              >
                {getRecipe && getRecipe.length
                  ? getRecipe?.map((recipe: GetRecipeInteface) => (
                      <DetailedCard
                        recipeLabel={recipe.name}
                        mins={recipe.cooking_time}
                        imageUri={recipe.image1}
                      ></DetailedCard>
                    ))
                  : ""}
              </View>
            </ScrollView>

            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                {/* <Text style={styles.trendingText}>Trending now</Text> */}
                <Image source={require("../assets/category.png")} />
              </View>

              <TouchableOpacity
                style={{ flexDirection: "row", marginRight: 20 }}
                onPress={() => navigation.navigate("SeeAllTrending")}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="arrow-forward" size={14} style={{ padding: 4 }} />
              </TouchableOpacity>
            </View>

            <View>
              <ScrollView
                horizontal={true}
                style={{ flexDirection: "row", marginTop: 20 }}
              >
                {trendingRecipe && trendingRecipe.length
                  ? trendingRecipe?.map((trendRecipe: GetPopularInterface) => (
                      <BigCard
                        BigCardName={trendRecipe?.recipe?.name}
                        imageUri={trendRecipe?.recipe?.image1}
                        Rating={trendRecipe?.recipe?.rate}
                        time={trendRecipe?.recipe?.cooking_time}
                      ></BigCard>
                    ))
                  : ""}
              </ScrollView>
            </View>

            <View style={{ marginTop: 20 }}>
              <Text style={styles.popularText}>Popular Category</Text>
            </View>

            <ScrollView
              horizontal={true}
              style={{ flexDirection: "row", marginTop: 20 }}
            >
              {popularCategories && popularCategories.length
                ? popularCategories.map(
                    (cat: CategoryInterface, index: number) => (
                      <CustomTabs
                        key={cat.id}
                        defaultSelected={index === 0}
                        label={cat.name}
                        width={"auto"}
                        height={32}
                        margin={4}
                        selected={tabText}
                        setSelected={setTabText}
                      ></CustomTabs>
                    )
                  )
                : ""}
            </ScrollView>

            <ScrollView horizontal={true}>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  marginRight: 20,
                  marginTop: 10,
                }}
              >
                {popularCat && popularCat.length
                  ? popularCat?.map((popRecipe: GetPopularInterface) => (
                      <DetailedCard
                        recipeLabel={popRecipe?.recipe?.name}
                        mins={popRecipe?.recipe?.cooking_time}
                        imageUri={popRecipe?.recipe?.image1}
                      ></DetailedCard>
                    ))
                  : ""}
              </View>
            </ScrollView>

            <View
              style={{
                marginTop: 30,
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View>
                <Text style={styles.trendingText}>New Recipe</Text>
                {/* <Image source={require('../assets/category.png')} /> */}
              </View>

              <TouchableOpacity
                style={{ flexDirection: "row", marginRight: 20 }}
                onPress={() => navigation.navigate("SeeAllNewRecipe")}
              >
                <Text style={styles.seeAllText}>See All</Text>
                <Icon name="arrow-forward" size={14} style={{ padding: 4 }} />
              </TouchableOpacity>
            </View>

            <ScrollView horizontal={true}>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
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

            {/* <View style={{marginTop: 20, flexDirection: 'row'}}>
          <CustomTabs defaultSelected={true} label={'All'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
          <CustomTabs label={'Read'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
          <CustomTabs label={'Unread'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <CustomTabs defaultSelected={true} label={'Ingredients'} width={150} height={32} margin={4} selected={selected} setSelected={setSelected}></CustomTabs>
          <CustomTabs label={'Procedure'} width={150} height={32} margin={4} selected={selected} setSelected={setSelected}></CustomTabs>

        </View> */}
          </View>
        </View>
      </ScrollView>
      {/*       <View style={{ marginTop: 70 }}>
        <BottomNavigationBar
          onItemTapped={onItemTapped}
          selectedIndex={0}
        ></BottomNavigationBar>
      </View> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  helloText: {
    fontSize: 20,
    fontWeight: "500",
    color: "black",
    textAlign: "left",
    marginTop: 20,
    paddingLeft: 0,
    paddingBottom: 10,
    marginLeft: 0,
  },

  welcomeText: {
    fontSize: 14,
    fontWeight: "400",
    color: "black",
    paddingLeft: 0,
    marginLeft: 0,
  },

  trendingText: {
    color: "black",
    fontWeight: "500",
    fontSize: 16,
  },

  seeAllText: {
    color: "#FC1125",
    fontSize: 14,
    fontWeight: "400",
  },
  popularText: {
    fontWeight: "500",
    fontSize: 16,
    color: "black",
  },
});

export default HomeScreen;
