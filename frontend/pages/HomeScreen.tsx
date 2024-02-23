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
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CustomChips from "../components/common/CustomChips";
import DetailedCard from "../components/home/DetailedCard";
import Icon from "react-native-vector-icons/Ionicons";
import CustomTabs from "../components/common/CustomTabs";
import SimpleCard from "../components/home/SimpleCard";
import { useDebounce, useGetAll } from "../hooks";
import {
  CategoryInterface,
  GetNewInteface,
  GetPopularInterface,
  GetRecipeInteface,
  UserInterface,
} from "../interfaces";
import BigCard from "../components/common/BigCard";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Card from "../components/home/Card";

const HomeScreen = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [user, setUser] = useState<UserInterface | undefined>(undefined);

  const [recentlySearchedRecipe, setRecentlySearchedRecipe] = useState([]);
  const [recentlyEnabled, setRecentlyEnabled] = useState(false);
  const [popularCatChipText, setPopularCatChipText] = useState<
    string | undefined
  >("all");
  const [allCatChipText, setAllCatChipText] = useState<string | undefined>(
    "all"
  );

  const handleSearch = (text: string) => {
    //logic
    setSearchText(text);
  };

  const query = useDebounce(searchText, 1000);

  const { data: popularCategories } = useGetAll({
    key: "/portal/popular-categories/",
    enabled: true,
  });

  const { data: allCategories } = useGetAll({
    key: `/portal/category/?q=${
      allCatChipText === "All" ? undefined : allCatChipText
    }`,
    enabled: true,
  });

  const { data: getRecipe, refetch: getRecipeRefetch } = useGetAll({
    key: `/recipes/list/?random=true&q=${
      allCatChipText == "All" && searchText == ""
        ? undefined
        : searchText == ""
        ? allCatChipText
        : query
    }`,

    enabled: true,
    // onSuccess(data) {
    //   console.log(data, "searchhedddddddddd");
    // },
  });

  const { data: popularCat, refetch: refetchPopularCatRecipe } = useGetAll({
    key: `recipes/popular-recipes/list/?q=${
      popularCatChipText === "All" ? undefined : popularCatChipText
    }`,
    enabled: true,
  });

  const { data: newRecipe } = useGetAll({
    key: "recipes/list/",
    enabled: true,
  });

  const { data: trendingRecipe } = useGetAll({
    key: "recipes/trending-recipes/list/",
    onSuccess(data) {
      // console.log(data, "yuiopkjgfdfgjkl;.kltfgnm,.");
    },
    enabled: true,
  });

  useGetAll({
    key: "social/recently-search-recipe/list/",
    enabled: recentlyEnabled,
    onSuccess(data) {
      setRecentlySearchedRecipe(data);
    },
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

  useEffect(() => {
    if (allCatChipText) {
      getRecipeRefetch();
      // console.log(allCategories, "qwe234567890-==========");
    }
  }, [allCatChipText]);

  useEffect(() => {
    if (popularCatChipText) {
      refetchPopularCatRecipe();
    }
  }, [popularCatChipText]);

  const onSearchFocus = () => {
    // console.log("in  onSearchFocus");
    setRecentlyEnabled(true);
  };

  const onSearchBlur = () => {
    setRecentlyEnabled(false);
    setRecentlySearchedRecipe([]);
  };

  return (
    <SafeAreaView style={{ height: "100%", backgroundColor: "white" }}>
      <ScrollView
        showsVerticalScrollIndicator={true}
        style={{ marginBottom: 0, paddingHorizontal: 20 }}
      >
        <View style={{ paddingBottom: 30 }}>
          <View>
            <Text style={styles.helloText}>Hello {user?.name || "Tulip"},</Text>
            <Text style={styles.welcomeText}>
              Welcome to the recipe paradise!
            </Text>
          </View>

          <View style={{ flexDirection: "column", position: "relative" }}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                width: "90%",
              }}
            >
              <CustomSearchBar
                value={searchText}
                placeholder={"Search"}
                onChangeText={handleSearch}
                barWidth={"80%"}
                onFocus={onSearchFocus}
                onBlur={onSearchBlur}
              ></CustomSearchBar>

              <FilterButton
                btnWidth={30}
                Press={() => navigation.navigate("FilterPage")}
              ></FilterButton>
            </View>

            {query && (
              <ScrollView>
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    paddingBottom: 70,
                    paddingHorizontal: 0,
                  }}
                >
                  {getRecipe &&
                    getRecipe?.length > 0 &&
                    getRecipe?.map((recipe: GetRecipeInteface) => (
                      <Card
                        applyGradient={true}
                        CardWidth={140}
                        CardHeight={140}
                        key={recipe.id}
                        CardName={recipe.name}
                        imageUri={recipe.image1}
                        Rating={String(recipe.rate)}
                        Press={() => {
                          // console.log("presssssssssssssssss")
                          navigation.navigate("RecipeDescription", {
                            id: recipe?.id,
                          });
                        }}
                      ></Card>
                    ))}
                </View>
              </ScrollView>
            )}

            {recentlySearchedRecipe &&
              recentlySearchedRecipe.length > 0 &&
              recentlySearchedRecipe?.map((recipe: GetPopularInterface) => {
                return (
                  <Card
                    applyGradient={true}
                    key={recipe.id}
                    CardName={recipe?.recipe?.name}
                    imageUri={recipe?.recipe?.image1}
                    Rating={recipe?.recipe?.rate}
                    Press={() => {
                      navigation.navigate("RecipeDescription", {
                        id: recipe?.recipe?.id,
                      });
                    }}
                  ></Card>
                );
              })}
            {!query && recentlySearchedRecipe.length === 0 && (
              <>
                <ScrollView
                  horizontal={true}
                  style={{
                    flexDirection: "row",
                    maxWidth: "100%",
                    paddingVertical: 10,
                  }}
                >
                  {allCategories && allCategories.length
                    ? [{ name: "All", id: "all" }, ...allCategories].map(
                        (cat: CategoryInterface, index: number) => (
                          // <CustomChips
                          //   key={cat.id}
                          //   defaultSelected={index === 0}
                          //   label={cat.name}
                          //   selected={allCatChipText}
                          //   setSelected={setAllCatChipText}
                          // ></CustomChips>
                          <CustomTabs
                            key={cat.id}
                            defaultSelected={index === 0}
                            label={cat.name}
                            width={"auto"}
                            height={32}
                            margin={4}
                            selected={allCatChipText}
                            setSelected={setAllCatChipText}
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
                    {getRecipe && getRecipe.length
                      ? getRecipe?.map((recipe: GetRecipeInteface) => (
                          <DetailedCard
                            key={recipe.id}
                            recipeId={recipe.id}
                            is_saved={recipe?.is_saved}
                            recipeLabel={recipe.name}
                            mins={recipe.cooking_time}
                            imageUri={recipe.image1}
                            Press={() =>
                              navigation.navigate("RecipeDescription", {
                                id: recipe?.id,
                              })
                            }
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
                    <Icon
                      name="arrow-forward"
                      size={14}
                      style={{ padding: 4 }}
                    />
                  </TouchableOpacity>
                </View>

                <View style={{ width: "100%" }}>
                  <ScrollView
                    horizontal={true}
                    style={{ flexDirection: "row", marginTop: 20 }}
                  >
                    {trendingRecipe && trendingRecipe.length
                      ? trendingRecipe?.map(
                          (trendRecipe: GetPopularInterface) => {
                            // console.log(trendRecipe);
                            return (
                              <BigCard
                                key={trendRecipe?.recipe?.id}
                                BigCardWidth={300}
                                BigCardName={trendRecipe?.recipe?.name}
                                imageUri={trendRecipe?.recipe?.image1}
                                Rating={trendRecipe?.recipe?.rate}
                                is_saved={trendRecipe?.recipe?.is_saved}
                                time={trendRecipe?.recipe?.cooking_time}
                                recipeId={trendRecipe?.recipe?.id}
                                Press={() =>
                                  navigation.navigate("RecipeDescription", {
                                    id: trendRecipe.recipe?.id,
                                  })
                                }
                              ></BigCard>
                            );
                          }
                        )
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
                    ? [{ name: "All", id: "all" }, ...popularCategories].map(
                        (cat: CategoryInterface, index: number) => (
                          <CustomTabs
                            key={cat.id}
                            defaultSelected={index === 0}
                            label={cat.name}
                            width={"auto"}
                            height={32}
                            margin={4}
                            selected={popularCatChipText}
                            setSelected={setPopularCatChipText}
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
                            key={popRecipe?.recipe.id}
                            recipeId={popRecipe?.recipe.id}
                            recipeLabel={popRecipe?.recipe?.name}
                            is_saved={popRecipe?.recipe?.is_saved}
                            mins={popRecipe?.recipe?.cooking_time}
                            imageUri={popRecipe?.recipe?.image1}
                            Press={() =>
                              navigation.navigate("RecipeDescription", {
                                id: popRecipe?.recipe?.id,
                              })
                            }
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
                    style={{ flexDirection: "row", marginRight: 5 }}
                    onPress={() => navigation.navigate("SeeAllNewRecipe")}
                  >
                    <Text style={styles.seeAllText}>See All</Text>
                    <Icon
                      name="arrow-forward"
                      size={14}
                      style={{ padding: 4 }}
                    />
                  </TouchableOpacity>
                </View>

                <ScrollView horizontal={true} style={{ paddingBottom: 50 }}>
                  <View
                    style={{
                      justifyContent: "space-between",
                      flexDirection: "row",
                    }}
                  >
                    {newRecipe && newRecipe.length
                      ? newRecipe?.map((recipe: GetNewInteface) => (
                          <SimpleCard
                            key={recipe?.id}
                            label={recipe.name}
                            imageUri={recipe.image1}
                            Press={() =>
                              navigation.navigate("RecipeDescription", {
                                id: recipe?.id,
                              })
                            }
                          ></SimpleCard>
                        ))
                      : ""}
                  </View>
                </ScrollView>
              </>
            )}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

/* <View style={{marginTop: 20, flexDirection: 'row'}}>
          <CustomTabs defaultSelected={true} label={'All'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
          <CustomTabs label={'Read'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
          <CustomTabs label={'Unread'} width={100} height={32} margin={4} selected={tabText} setSelected={setTabText}></CustomTabs>
        </View>

        <View style={{marginTop: 20, flexDirection: 'row'}}>
          <CustomTabs defaultSelected={true} label={'Ingredients'} width={150} height={32} margin={4} selected={selected} setSelected={setSelected}></CustomTabs>
          <CustomTabs label={'Procedure'} width={150} height={32} margin={4} selected={selected} setSelected={setSelected}></CustomTabs>

        </View> */

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
