import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "./HomeScreen";
import SavedRecipePage from "./SavedRecipePage";
import NotificationPage from "./NotificationPage";
import AccountPage from "./AccountPage";
import Icon from "react-native-vector-icons/Ionicons";
import {
  Animated,
  Image,
  ImageURISource,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import RecipeCreatePage from "./RecipeCreatePage";
import { CurvedBottomBar } from "react-native-curved-bottom-bar";
import Ionicons from "react-native-vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const Assets: { [key: string]: ImageURISource } = {
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

function BottomBarContainer({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) {
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdow: {
      shadowColor: "#DDDDDD",
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 5,
    },
    button: {
      flex: 1,
      justifyContent: "center",
    },
    bottomBar: {},
    btnCircleUp: {
      width: 60,
      height: 60,
      borderRadius: 30,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#E8E8E8",
      bottom: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
    },
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: "gray",
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const _renderIcon = (route: string, selectedTab: string) => {
    let iconName: string = "";
    let focused = selectedTab === route;
    if (route === "HomeScreen") {
      iconName = focused ? "selectedHome" : "Home";
    } else if (route === "SavedRecipePage") {
      iconName = focused ? "selectedBookmark" : "Bookmark";
    } else if (route === "NotificationPage") {
      iconName = focused ? "selectedNotifications" : "Notifications";
    } else if (route === "AccountPage") {
      iconName = focused ? "selectedProfile" : "Profile";
    }
    return (
      <Image
        style={{ height: 25, width: 25 }}
        source={Assets[iconName]}
      ></Image>
    );
  };
  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: Function;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
      </TouchableOpacity>
    );
  };

  const AddButton: React.FC<{
    children?: React.ReactNode;
    onPress?: () => void;
  }> = ({ children, onPress }) => (
    <TouchableOpacity
      onPress={() => navigation.navigate("")}
      style={{
        top: -50,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
        height: 80,
        borderRadius: 40,
        position: "relative",
        padding: 10,
        zIndex: 10,
        borderColor: "white",
        // borderWidth: 5,
        shadowColor: "black",
        shadowOpacity: 0.1,
        shadowRadius: 25,
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
    <CurvedBottomBar.Navigator
      tabBar={renderTabBar}
      style={styles.bottomBar}
      shadowStyle={styles.shawdow}
      circleWidth={50}
      bgColor="white"
      initialRouteName="HomeScreen"
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          padding: 12,
          paddingBottom: 20,
          height: 60,
        },
        headerShown: false,
      })}
      renderCircle={({ selectedTab, navigate }) => {
        return (
          <Animated.View style={styles.btnCircleUp}>
            <LinearGradient
              colors={["rgba(252, 17, 37, 1)", "rgba(255, 147, 0, 1)"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 0, y: 1 }}
              style={{ borderRadius: 50, height: 60, width: 60 }}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigate("RecipeCreatePage")} //Correct navigation daldo yaha
              >
                <Ionicons
                  name={"add"}
                  color="white"
                  size={25}
                  style={{ justifyContent: "center", alignSelf: "center" }}
                />
              </TouchableOpacity>
            </LinearGradient>
          </Animated.View>
          //<View style={styles.addIcon}></View>
        );
      }}
      /*       screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
          padding: 12,
          paddingBottom: 20,
          height: 60,
        },
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconName;
          // if (route.name === "HomeScreen") {
          //   iconName = focused ? "home" : "home-outline";
          // } else if (route.name === "SavedRecipePage") {
          //   iconName = focused ? "bookmark" : "bookmark-outline";
          // } else if (route.name === "NotificationPage") {
          //   iconName = focused ? "notifications" : "notifications-outline";
          // } else if (route.name === "AccountPage") {
          //   iconName = focused ? "person" : "person-outline";
          // } else {
          //   iconName = "add";
          // }

          if (route.name === "HomeScreen") {
            iconName = focused ? "selectedHome" : "Home";
          } else if (route.name === "SavedRecipePage") {
            iconName = focused ? "selectedBookmark" : "Bookmark";
          } else if (route.name === "NotificationPage") {
            iconName = focused ? "selectedNotifications" : "Notifications";
          } else if (route.name === "AccountPage") {
            iconName = focused ? "selectedProfile" : "Profile";
          } else {
            iconName = "Add";
          }
          return (
            // <Icon
            //   name={iconName}
            //   size={30}
            //   color={focused ? "#FC1125" : "#D9D9D9"}
            // />
            <Image
              style={{ height: 25, width: 25 }}
              source={Assets[iconName]}
            ></Image>
          );
        },
      })} */
    >
      <CurvedBottomBar.Screen
        position="LEFT"
        name="HomeScreen"
        component={HomeScreen}
      ></CurvedBottomBar.Screen>
      <CurvedBottomBar.Screen
        position="LEFT"
        name="SavedRecipePage"
        component={SavedRecipePage}
      ></CurvedBottomBar.Screen>

      <CurvedBottomBar.Screen
        position="RIGHT"
        name="NotificationPage"
        component={NotificationPage}
      ></CurvedBottomBar.Screen>
      <CurvedBottomBar.Screen
        position="RIGHT"
        name="AccountPage"
        component={AccountPage}
      ></CurvedBottomBar.Screen>
    </CurvedBottomBar.Navigator>
  );
}
export default BottomBarContainer;
