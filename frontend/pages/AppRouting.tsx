import React, { ReactNode, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LandingPage from "../pages/LandingPage";
import SignInPage from "../pages/SignInPage";
import SignUpPage from "../pages/SignUpPage";
import ForgotPassPage from "../pages/ForgotPassPage";
import VerifyEmailPage from "../pages/VerifyEmailPage";
import ResetPassPage from "../pages/ResetPassPage";
import HomeScreen from "../pages/HomeScreen";
import SearchRecipes from "../pages/SearchRecipes";
import Sample from "../pages/Sample";
import SavedRecipePage from "../pages/SavedRecipePage";
import NotificationPage from "../pages/NotificationPage";
import AccountPage from "../pages/AccountPage";
import FilterPage from "../pages/FilterPage";
import RecipeDescription from "../pages/RecipeDescription";
import BottomBarContainer from "../pages/BottomBarContainer";
import RecipeCreatePage from "../pages/RecipeCreatePage";
import SeeAllNewRecipe from "../pages/SeeAllNewRecipe";
import SeeAllTrending from "../pages/SeeAllTrending";
import FilterResponse from "../pages/FilterResponse";
import ReviewPage from "../pages/ReviewPage";
import EditProfilePage from "../pages/EditProfilePage";
import linking from "../utils/linking";
import { AuthContext, AuthProvider } from "../context";
import { ActivityIndicator, Linking, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export type RootStackParamList = {
  LandingPage: undefined;
  HomeScreen: undefined;
  SignInPage: undefined;
  ForgotPassPage: undefined;
  VerifyEmailPage: undefined;
  BottomBarContainer: undefined;
  ResetPassPage: undefined;
  SavedRecipePage: undefined;
  NotificationPage: undefined;
  AccountPage: undefined;
  SignUpPage: undefined;
  Sample: undefined;
  SearchRecipes: undefined;
  FilterPage: undefined;
  RecipeDescription: { id: string };
  // IngredientsList: any;
  RecipeCreatePage: undefined;
  SeeAllNewRecipe: undefined;
  SeeAllTrending: undefined;
  FilterResponse: undefined;
  ReviewPage: { id: string };
  EditProfilePage: undefined;
};

function AppRouting() {
  const Stack = createNativeStackNavigator<RootStackParamList>();

  let AuthState = useContext(AuthContext);

  const [initialState, setInitialState] = useState();

  React.useEffect(() => {
    const restoreState = async () => {
      try {
        const initialUrl = await Linking.getInitialURL();

        if (initialUrl == null) {
          const savedStateString = await AsyncStorage.getItem(
            "NAVIGATION_STATE_V1"
          );
          const state = savedStateString
            ? JSON.parse(savedStateString)
            : undefined;

          if (state !== undefined) {
            setInitialState(state);
          }
        }
      } finally {
        AuthState.setIsLoading && AuthState.setIsLoading(false);
      }
    };

    if (AuthState.isLoading) {
      restoreState();
    }
  }, [AuthState.isLoading]);

  if (AuthState.isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={"large"}></ActivityIndicator>
      </View>
    );
  }

  return (
    <NavigationContainer
      linking={linking}
      documentTitle={{ enabled: false }}
      initialState={initialState}
      onStateChange={(state) => {
        console.log("In state changegege");
        AsyncStorage.setItem("NAVIGATION_STATE_V1", JSON.stringify(state));
      }}
    >
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        {/* <PrivateRoute name="HomeScreen" component={HomeScreen} /> */}
        {!AuthState.isAuthenticated ? (
          <>
            <Stack.Screen name="LandingPage" component={LandingPage} />
            <Stack.Screen name="SignInPage" component={SignInPage} />
            <Stack.Screen name="ForgotPassPage" component={ForgotPassPage} />
            <Stack.Screen name="VerifyEmailPage" component={VerifyEmailPage} />
            <Stack.Screen name="ResetPassPage" component={ResetPassPage} />
            <Stack.Screen name="SignUpPage" component={SignUpPage} />
          </>
        ) : (
          <>
            <Stack.Screen
              name="BottomBarContainer"
              component={BottomBarContainer}
            />
            <Stack.Screen name="HomeScreen" component={HomeScreen} />
            <Stack.Screen name="SavedRecipePage" component={SavedRecipePage} />
            <Stack.Screen
              name="NotificationPage"
              component={NotificationPage}
            />
            <Stack.Screen name="AccountPage" component={AccountPage} />
            <Stack.Screen name="Sample" component={Sample} />
            <Stack.Screen name="SearchRecipes" component={SearchRecipes} />
            <Stack.Screen name="FilterPage" component={FilterPage} />
            <Stack.Screen
              name="RecipeDescription"
              component={RecipeDescription}
            />
            <Stack.Screen
              name="RecipeCreatePage"
              component={RecipeCreatePage}
            />
            <Stack.Screen name="SeeAllNewRecipe" component={SeeAllNewRecipe} />
            <Stack.Screen name="SeeAllTrending" component={SeeAllTrending} />
            <Stack.Screen name="FilterResponse" component={FilterResponse} />
            <Stack.Screen name="ReviewPage" component={ReviewPage} />
            <Stack.Screen name="EditProfilePage" component={EditProfilePage} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppRouting;
