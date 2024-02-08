import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useState } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabs from "../components/common/CustomTabs";
import StepsCard from "../components/StepsCard";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { useGetAll } from "../hooks";
import { NotificationInterface,GetProfileInterface } from "../interfaces";
import Notification from "../components/Notification";

const NotificationPage = ({
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

  const [profile, setProfile] = useState<GetProfileInterface | null>(null);


  const { data: getProfile } = useGetAll({
    key: "/accounts/profile/",
    select: (data: any) => data?.data,
    onSuccess: (data) => {

      setProfile(data);
    },
  });
  
  const [notify, setNotify] = useState<NotificationInterface | null>(null);

  const {data : getNotification} = useGetAll({
    key:"/social/notification/list/?type=all",
    select:(data : any) => data?.data?.rows,
    onSuccess:(data) =>{
      console.log("notify================",data);
      
    },
  });

  const [tabText, setTabText] = useState<string | undefined>(undefined);
  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>
      <ScrollView>
        <View>
          <Text style={styles.header}>Notifications</Text>
        </View>

        <View style={{ flexDirection: "row", margin: 20 }}>
          <CustomTabs
            label={"All"}
            width={100}
            height={30}
            margin={4}
            selected={tabText}
            setSelected={setTabText}
            defaultSelected={true}
          ></CustomTabs>
          <CustomTabs
            label={"Read"}
            width={100}
            height={30}
            margin={4}
            selected={tabText}
            setSelected={setTabText}
          ></CustomTabs>
          <CustomTabs
            label={"Unread"}
            width={100}
            height={30}
            margin={4}
            selected={tabText}
            setSelected={setTabText}
          ></CustomTabs>
        </View>

        <View>
          <View>
            <Text style={styles.todayText}>Today</Text>
          </View>

          <View style={{ margin: 20 }}>

          {getNotification?.length>0 ? getNotification?.map((notification:NotificationInterface)=><Notification data={notification}
            Press = {() =>
              navigation.navigate("RecipeDescription", {
                id: notification.recipe?.id,
              })
            }
          ></Notification>): ''}

            
            
          </View>
        </View>
      </ScrollView>
      {/* <BottomNaviPress?:() => void;gationBar onItemTapped={onItemTapped} selectedIndex={0}></BottomNavigationBar> */}
    </SafeAreaView>
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

  todayText: {
    fontWeight: "300",
    fontSize: 12,
    color: "black",
    alignSelf: "center",
    //   margin: 10,
  },
});

export default NotificationPage;
