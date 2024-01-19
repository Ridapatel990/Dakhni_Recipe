import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  DimensionValue,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RatingChip from "./RatingChip";
import Time from "./Time";
import SavedBtn from "../SavedBtn";
import { mediaUrl } from "../../utils/urls";

interface CardProps {
  BigCardName: string;
  // BigCardImage?: string;
  imageUri?: string | null;
  BigCardWidth?: DimensionValue;
  BigCardHeight?: DimensionValue;
  Rating?: number;
  Review?: string;
  time?: string;
}
const Card: React.FC<CardProps> = ({
  BigCardName,
  imageUri,
  BigCardWidth = 300,
  BigCardHeight = 230,
  Rating,
  Review,
  time,
}) => {
  return (
    <View style={{ display: "flex" }}>
      <View
        style={{ ...styles.card, width: BigCardWidth, height: BigCardHeight }}
      >
        <ImageBackground
          // source={require("../../assets/BigCardImage.png")}
          source={
            imageUri
              ? { uri: mediaUrl + imageUri }
              : require("../../assets/BigCardImage.png")
          }
          style={{
            ...styles.image,
            width: BigCardWidth,
            height: BigCardHeight,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Add more Card components as needed */}
          </View>
        </ImageBackground>
        <View
          style={{
            ...styles.overlay,
            width: BigCardWidth,
            height: BigCardHeight,
          }}
        ></View>

        <RatingChip Rating={Rating} />

        <Time Time={time}></Time>

        {/* <SavedBtn></SavedBtn> */}
      </View>

      <View style={{ marginTop: 5, marginBottom: 10 }}>
        <Text style={styles.name}>{BigCardName}</Text>
        <Text style={styles.review}>{Review}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    // width:100,
    overflow: "hidden", // To clip the overlay to the card boundaries
    margin: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 4,
    position: "relative",
  },

  buttonGradient: {
    width: 350,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: "center",
  },

  image: {
    borderRadius: 15,
    alignItems: "center",
    overflow: "hidden",
    // backgroundColor:'black',
    opacity: 0.9,
    zIndex: 1,
  },

  overlay: {
    position: "absolute",
    opacity: 1,
    zIndex: 1,
  },

  name: {
    // width: 150,
    // height: 150,
    borderRadius: 15,
    fontSize: 20,
    fontWeight: "400",
    color: "black",
    paddingLeft: 10,
    marginTop: 1,
    backgroundColor: "transparent",
    textAlignVertical: "bottom",
    opacity: 1,
    zIndex: 3,
    // position: "absolute",
    bottom: 0,
    left: 0,
    alignSelf: "flex-start",
  },

  review: {
    fontSize: 12,
    fontWeight: "300",
    alignSelf: "flex-end",
    paddingRight: 10,
    position: "absolute",
    paddingEnd: 15,
  },
});

export default Card;
