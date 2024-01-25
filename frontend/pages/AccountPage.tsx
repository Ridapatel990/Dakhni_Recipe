import { View, Text, Image, ScrollView ,StyleSheet} from "react-native";
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

// const ScrollViewContent = () => (
//   <ScrollView horizontal={false}>
//     <View>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//     </View>
//   </ScrollView>
// );

interface ProfileProps {
  Name?:string,
  Label?:string,
  Description?:string
}

const styles=StyleSheet.create({
  Name:{
    fontSize:20,
    alignSelf:'center',
    marginTop:10
  },

  Label:{
    fontSize:15,
    alignSelf:'center',
    marginTop:10
  },

  Description:{
    fontSize:15,
    alignSelf:'center',
    marginTop:10
  },
})

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
        </View>
       

        
        
      <View style={{flexDirection: "column"}}>
            <CircularAvatar image="photo"></CircularAvatar>
            <Text style={{...styles.Name}}>Elena</Text>
            
        </View>
        <ScrollView horizontal={false}>
        <View>

        <Text style={{...styles.Label}}>Chef</Text>
        <Text style={{...styles.Description}}>Lorem ipsum dolor sit amet consect </Text>
        
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

      
    <View style={{marginBottom:260}}>
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
