import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  DimensionValue,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RatingChip from "../RatingChip";
import { mediaUrl } from "../../utils/urls";

interface CardProps {
  CardName?: string;
  imageUri?: string | null;
  CardWidth?: DimensionValue;
  CardHeight?: DimensionValue;
  Rating?: number;
}
const Card: React.FC<CardProps> = ({
  CardName,
  imageUri = null,
  CardWidth = 150,
  CardHeight = 160,
  Rating,
}) => {
  return (
    <View style={{ ...styles.card, width: CardWidth, height: CardHeight }}>
      <ImageBackground
        source={
          imageUri
            ? { uri: mediaUrl + imageUri }
            : require("../../assets/sample.png")
        }
        style={styles.image}
      >
        <LinearGradient
          colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.buttonGradient}
        />

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
      <View style={styles.overlay}></View>

      <Text style={styles.name}>{CardName}</Text>

      <RatingChip Rating={String(Rating)} />
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    // width:CardWidth,
    overflow: "hidden", // To clip the overlay to the card boundaries
    margin: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 4,
    position: "relative",
  },

  buttonGradient: {
    width: 150,
    height: "100%",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 14,
    justifyContent: "center",
  },

  image: {
    width: 150,
    height: 160,
    borderRadius: 15,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "black",
    opacity: 0.7,
    zIndex: 1,
  },
  overlay: {
    width: 150,
    height: 150,
    position: "absolute",
    opacity: 1,
    zIndex: 1,
  },

  name: {
    alignItems: "center",
    // width: 150,
    // height: 150,
    borderRadius: 15,
    fontSize: 16,
    fontWeight: "bold",
    color: "white",
    paddingLeft: 10,
    paddingBottom: 5,
    backgroundColor: "transparent",
    textAlignVertical: "bottom",
    opacity: 1,
    zIndex: 3,
    position: "absolute",
    bottom: 0,
    left: 0,
  },
});

export default Card;
