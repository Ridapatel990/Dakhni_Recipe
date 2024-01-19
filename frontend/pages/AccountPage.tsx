import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../components/Profile";
import EditPage from "./EditPage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import CircularAvatar from "../components/CircleAvatar";
import ProfileComponent from "../components/home/ProfileComponent";
import BigButton from "../components/common/BigButton";
import BigCard from "../components/common/BigCard";
import BottomNavigationBar from "../components/BottomNavigationBar";

const ScrollViewContent = () => (
  <ScrollView horizontal={false}>
    <View>
      <BigCard
        BigCardName="Biryani"
        BigCardWidth={360}
        Review="13k Reviews"
      ></BigCard>
      <BigCard
        BigCardName="Biryani"
        BigCardWidth={360}
        Review="13k Reviews"
      ></BigCard>
      <BigCard
        BigCardName="Biryani"
        BigCardWidth={360}
        Review="13k Reviews"
      ></BigCard>
      <BigCard
        BigCardName="Biryani"
        BigCardWidth={360}
        Review="13k Reviews"
      ></BigCard>
    </View>
  </ScrollView>
);

const AccountPage = ({
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
  return (
    <SafeAreaView>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Profile navigation={navigation}></Profile>
        </View>

        <View style={{ margin: 10 }}>
          <ProfileComponent></ProfileComponent>
        </View>
      </View>

      <View style={{ margin: 20, padding: 20 }}>
        <BigButton
          btnLabel="Recipe"
          btnWidth={"100%"}
          btnHeight={50}
          btnBorder={10}
          btnPosition="relative"
        ></BigButton>
      </View>

      <ScrollViewContent />

      {/* <View>
          <View>
            <Profile></Profile>
          </View>
          <View>
              <ProfileComponent></ProfileComponent>
            </View>
        </View> */}
    </SafeAreaView>
  );
};

export default AccountPage;
