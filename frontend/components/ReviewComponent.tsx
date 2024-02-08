import React from "react";
import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularAvatar from "./CircleAvatar";

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
        <CircularAvatar
          height={40}
          width={40}
          image={profile_pic}
        ></CircularAvatar>
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
        <Text>{review}</Text>
      </View>
    </SafeAreaView>
  );
};
export default ReviewComponent;
