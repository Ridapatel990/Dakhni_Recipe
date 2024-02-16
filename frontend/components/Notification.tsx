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
        <View style={styles.description}>
          <Text>
            We've just added a delicious new recipe {data?.recipe?.name} to our
            collection. Perfect for cooking enthusiasts and anyone who loves
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
    color: "black",
    fontSize: 16,
    fontWeight: "300",
  },
  description: {
    paddingLeft: 10,
    color: "#A9A9A9",
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
