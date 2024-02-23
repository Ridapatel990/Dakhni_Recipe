import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { mediaUrl } from "../../utils/urls";

interface SimpleCardProps {
  label: string;
  imageUri?: string | null;
  applyGradient?: boolean; // New prop to conditionally apply gradient
  Press?: () => void;
}

const SimpleCard: React.FC<SimpleCardProps> = ({
  label,
  imageUri,
  applyGradient = false, // Default value for applyGradient is false
  Press,
}) => {
  const styles = StyleSheet.create({
    container: {
      height: 160,
      width: 124,
      marginTop: 20,
      marginRight: 10,
      borderRadius: 10,
      overflow: "hidden", // Ensure gradient doesn't overflow
    },
    image: {
      height: 124,
      width: 124,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
    },
    text: {
      color: "white", // Text color against gradient background
      paddingTop: 10,
      paddingLeft: 5,
    },
  });

  return (
    <TouchableOpacity onPress={Press}>
      <View style={styles.container}>
        {applyGradient ? (
          <ImageBackground
            source={
              imageUri
                ? { uri: mediaUrl + imageUri }
                : require("../../assets/sample2.png")
            }
            style={styles.image}
            resizeMode="cover"
          >
            <LinearGradient
              colors={["rgba(0, 0, 0, 0)", "rgba(0, 0, 0, 0.7)"]}
              style={styles.gradient}
            />
          </ImageBackground>
        ) : (
          <Image
            source={
              imageUri
                ? { uri: mediaUrl + imageUri }
                : require("../../assets/sample2.png")
            }
            style={styles.image}
          />
        )}
        <View style={{ paddingBottom: 5 }}>
          <Text style={styles.text}>{label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default SimpleCard;
