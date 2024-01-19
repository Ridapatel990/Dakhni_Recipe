import { View, Text, Image, StyleSheet } from "react-native";
import React from "react";
import { mediaUrl } from "../../utils/urls";

interface SimpleCardProps {
  label: string;
  imageUri?: string | null;
}

const SimpleCard: React.FC<SimpleCardProps> = ({ label, imageUri }) => {
  const styles = StyleSheet.create({
    container: {
      height: 150,
      width: 124,
      marginTop: 20,
      marginRight: 10,

      // borderWidth: 1
    },
    image: {
      height: 124,
      width: 124,
      borderRadius: 10,
    },
    text: {
      color: "black",
      paddingTop: 10,
      paddingLeft: 5,
    },
  });
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={
            imageUri
              ? { uri: mediaUrl + imageUri }
              : require("../../assets/sample.png")
          }
          style={styles.image}
        />
      </View>
      <View style={{ paddingBottom: 5 }}>
        <Text style={styles.text}>{label}</Text>
      </View>
    </View>
  );
};

export default SimpleCard;
