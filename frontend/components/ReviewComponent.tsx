import React from "react";
import { View, Text, StyleSheet ,Image} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularAvatar from "./CircleAvatar";
import { GetProfileInterface } from "../interfaces";
import { useState } from "react";
import { useGetAll } from "../hooks";
import { mediaUrl } from "../utils/urls";

interface ReviewComponentProps {
  name: string;
  time: string;
  review: string;
  profile_pic: string;
}




const ReviewComponent: React.FC<ReviewComponentProps> = ({
  name,
  time,
  review,
  profile_pic,
}) => {

 
  return (
    <SafeAreaView>
      <View
        style={{
          flexDirection: "row",
          alignSelf: "flex-start",
          marginLeft: 20,
        }}
      >
        <View>
      <View style={{ marginTop: 0 }}>
      <Image source={ profile_pic ? {uri: mediaUrl + profile_pic} : require('../assets/NoProfile.png')} style={styles.profileImage}></Image>
      
      </View>
    </View>
        <View
          style={{
            flexDirection: "column",
            marginLeft: 10,
            justifyContent: "space-between",
          }}
        >
          <Text style={{ fontSize: 15, color: "black", fontWeight: "300" }}>
            {name}
          </Text>
          <Text style={{ fontSize: 10, fontWeight: "200" }}>{time}</Text>
        </View>
      </View>
      <View style={{ width: "90%", alignSelf: "center", marginTop: 5 }}>
        <Text style={{color:'black'}}>{review}</Text>
      </View>
    </SafeAreaView>
  );
};

const styles=StyleSheet.create({
  profileImage:{
    height: 40,
      width: 40,
      alignSelf: "center",
      borderRadius: 90,
  }
})
export default ReviewComponent;
