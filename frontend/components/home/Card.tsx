import React from "react";
import {
  Text,
  View,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import RatingChip from "../RatingChip";
import { mediaUrl } from "../../utils/urls";

interface CardProps {
  CardName?: string;
  imageUri?: string | null;
  CardWidth?: number;
  CardHeight?: number;
  Rating?: string;
  Press?: () => void;
  applyGradient?: boolean; // New prop to conditionally apply gradient
}

const Card: React.FC<CardProps> = ({
  CardName,
  imageUri = null,
  CardWidth = 150,
  CardHeight = 160,
  Rating,
  Press,
  applyGradient = false, // Default value for applyGradient is false
}) => {
  return (
    <TouchableOpacity onPress={() => Press && Press()} activeOpacity={0.9}>
      <View style={{ ...styles.card, width: CardWidth, height: CardHeight }}>
        {applyGradient ? (
          <LinearGradient
            colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 1)"]}
            // start={{ x: 0, y: 0 }}
            // end={{ x: 0, y: 1 }}
            style={styles.gradient}
          >
            <ImageBackground
              source={
                imageUri
                  ? { uri: mediaUrl + imageUri }
                  : require("../../assets/sample2.png")
              }
              style={styles.image}
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
          </LinearGradient>
        ) : (
          <ImageBackground
            source={
              imageUri
                ? { uri: mediaUrl + imageUri }
                : require("../../assets/sample2.png")
            }
            style={styles.image}
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
        )}
        <View style={styles.overlay}></View>

        <Text style={styles.name}>{CardName}</Text>

        <RatingChip Rating={String(Rating)} />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 15,
    overflow: "hidden", // To clip the overlay to the card boundaries
    margin: 10,
    alignItems: "center",
    shadowColor: "black",
    shadowOpacity: 1,
    shadowRadius: 4,
    position: "relative",
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 15,
    alignItems: "center",
    overflow: "hidden",
    backgroundColor: "black",
    opacity: 0.7,
    zIndex: 1,
  },
  overlay: {
    width: "100%",
    height: "100%",
    position: "absolute",
    opacity: 1,
    zIndex: 1,
  },
  name: {
    alignItems: "center",
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
