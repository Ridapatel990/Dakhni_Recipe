import { View, Text, StyleSheet, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CustomTabs from "../components/common/CustomTabs";
import { useCreateOrUpdate, useGetAll } from "../hooks";
import { NotificationInterface } from "../interfaces";
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

 
  
  const [notificationId ,setNotificationId] = useState<string>('');

  const [tabText, setTabText] = useState<string | undefined>(undefined);
  const {data : getNotification,refetch} = useGetAll({
    key:`/social/notification/list/?type=${tabText ? tabText : tabText?.toLowerCase()}`,
    select:(data : any) => data?.data?.rows,
    onSuccess:(data) =>{
      console.log("notify================",data);
      
    },
  });
  const { mutate } = useCreateOrUpdate({
    url: `/social/notification/${notificationId}/`,
    method :'put',
    onSuccess:  (response) => {
      console.log('Success of read API',response)
      // ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
    },
    onError : (error) => {
      console.log('-----',error.status)
    }
  });



  useEffect(()=> {
    if(tabText) {
      refetch();
    }
  },[tabText])



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
            Press = {() =>{
              setNotificationId(notification.id)
              mutate({"is_read":true})
              navigation.navigate("RecipeDescription", {
                id: notification.recipe?.id,
              })
            }
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
