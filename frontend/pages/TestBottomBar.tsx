import React from "react";
import {
  createBottomTabNavigator,
  BottomTabBar,
} from "@react-navigation/bottom-tabs";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import HomeScreen from "./HomeScreen";
import SavedRecipePage from "./SavedRecipePage";
import RecipeCreatePage from "./RecipeCreatePage";
import NotificationPage from "./NotificationPage";
import AccountPage from "./AccountPage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const Tab = createBottomTabNavigator();

interface BottomProps {
  state: string;
  descriptors: string;
  navigation: any;
}

const icons = {
  Home: require("../assets/Home.png"),
  Bookmark: require("../assets/Bookmark.png"),
  Notifications: require("../assets/Notification.png"),
  Profile: require("../assets/Profile.png"),
  selectedHome: require("../assets/selectedHome.png"),
  selectedBookmark: require("../assets/selectedBookmark.png"),
  selectedNotifications: require("../assets/selectedNotification.png"),
  selectedProfile: require("../assets/selectedProfile.png"),
  Add: require("../assets/whiteAdd.png"),
};

const BottomTabBarComponent = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const styles = StyleSheet.create({
    navBar: {
      height: "auto",
      backgroundColor: "white",
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowRadius: 24,
      elevation: 5,
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
    },
    addButton: {
      position: "absolute",
      backgroundColor: "white",
      width: 70,
      height: 80,
      borderRadius: 35,
      bottom: 33,
      marginLeft: 15,
      zIndex: 10,
      left: "50%",
      transform: [{ translateX: -25 }],
      alignItems: "center",
      justifyContent: "center",
      borderColor: "white",
      borderWidth: 5,
      shadowColor: "black",
      shadowOpacity: 0.1,
      shadowRadius: 24,
    },
    addIcon: {
      backgroundColor: "white",
      padding: 20,
      flexDirection: "row",
      justifyContent: "space-around",
      alignItems: "center",
      position: "relative",
    },
  });

  interface AddBtnProps {
    children: any;
    onPress: any;
  }

  const AddButton: React.FC<AddBtnProps> = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={() => onPress && onPress()}
      style={{
        top: -40,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 80,
        borderRadius: 40,
        padding: 10,
      }}
    >
      <LinearGradient
        colors={["rgba(252, 17, 37, 1)", "rgba(255, 147, 0, 1)"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ borderRadius: 50, height: 60, width: 60, marginBottom: 7 }}
      >
        <View
          style={{
            width: 60,
            height: 60,
            borderRadius: 40,
          }}
        >
          {children}
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );

  return (
    <View style={styles.navBar}>
      {/* <BottomTabBar  {...{ state, descriptors, navigation }} /> */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate("RecipeCreatePage")}
      >
        <View style={styles.addIcon}>
          <Image style={{ height: 25, width: 25 }} source={icons["Add"]} />
        </View>
      </TouchableOpacity>
    </View>
  );
};

const BottomBarContainer = () => {
  return (
    <Tab.Navigator
      initialRouteName="HomeScreen"
      //   tabBar={(props) => <BottomTabBarComponent {...props} />}
    >
      <Tab.Screen name="HomeScreen" component={HomeScreen} />
      <Tab.Screen name="SavedRecipePage" component={SavedRecipePage} />
      <Tab.Screen name="Add" component={RecipeCreatePage} />
      <Tab.Screen name="NotificationPage" component={NotificationPage} />
      <Tab.Screen name="AccountPage" component={AccountPage} />
    </Tab.Navigator>
  );
};

export default BottomTabBarComponent;
