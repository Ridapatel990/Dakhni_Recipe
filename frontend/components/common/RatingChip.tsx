import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
  Image,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import React from "react";
import LinearGradient from "react-native-linear-gradient";

interface RatingChipProps {
  Rating?: number;
}

const RatingChip: React.FC<RatingChipProps> = ({ Rating = "4.0" }) => {
  const styles = StyleSheet.create({
    chip: {
      height: 20,
      width: 45,
      alignSelf: "center",
      borderRadius: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
    },
    ratingText: {
      fontSize: 11,
      color: "white",
      //alignSelf:'flex-end',
      paddingRight: 5,
      paddingLeft: 5,
    },
    starImage: {
      height: 12,
      width: 12,
      marginLeft: 3,
      // alignSelf:'flex-start',
    },
  });

  return (
    <SafeAreaView style={{ position: "absolute", zIndex: 3, right: 5 }}>
      <View style={{ paddingTop: 10 }}>
        <LinearGradient
          colors={["rgba(252, 17, 37, 1)", "rgba(255, 147, 0, 1)"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={styles.chip}
        >
          <Image
            source={require("../../assets/star2.png")}
            style={styles.starImage}
          ></Image>
          <Text style={styles.ratingText}>{Rating}</Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
};
export default RatingChip;
