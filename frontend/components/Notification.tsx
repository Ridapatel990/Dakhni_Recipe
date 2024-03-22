import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import React from "react";
import TimeAgo from "react-native-timeago";
import { NotificationInterface } from "../interfaces";

const Notification: React.FC<{
  data: NotificationInterface;
  Press?: () => void;
}> = ({ data, Press }: { data: NotificationInterface; Press?: () => void }) => {
  return (
    <TouchableOpacity
      onPress={() => {
        Press && Press();
      }}
    >
      <View style={styles.cardContainer}>
        <View>
          <Text style={styles.stepText}>New Recipe Alert!</Text>
        </View>
        <View>
          <Text style={styles.description}>
            We've just added a delicious new recipe <Text style={{color:"black",fontWeight:"400"}}>{data?.recipe?.name}</Text> to
           our collection. Perfect for cooking enthusiasts and anyone who loves
            trying new flavors. Don't miss out!
          </Text>
        </View>
        <View style={styles.time}>
          <TimeAgo time={data.created_on}></TimeAgo>
          {/* <Text style={styles.time}>{time}</Text> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  slide: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  cardContainer: {
    marginTop: 20,
    paddingBottom: 10,
    height: "auto",
    width: 320,
    backgroundColor: "rgba(217, 217, 217, 0.28)",
    borderRadius: 12,
    marginRight: 10,
    alignSelf: "center",
  },
  stepText: {
    padding: 10,
    color: "rgba(0, 0, 0, 1)",
    fontSize: 16,
    fontWeight: "300",
    fontFamily:"Satoshi Variable"
  },
  description: {
    paddingLeft: 10,
    fontWeight:"400",
    color: "rgba(169, 169, 169, 1)",
    fontFamily:"Satoshi Variable"
  },
  time: {
    paddingRight: 10,
    color: "#A9A9A9",
    marginTop: 10,
    fontSize: 4,
    fontWeight: "100",
    alignSelf: "flex-end",
  },
});

export default Notification;
