import { View, Text, StyleSheet, Image } from "react-native";
import React, { useEffect, useState } from "react";
import SavedBtn from "../SavedBtn";
import { mediaUrl } from "../../utils/urls";
import { useCreateOrUpdate, useGetAll } from "../../hooks";

interface DetailedProps {
  imageUri?: string;
  recipeLabel: string;
  recipeId: string;
  mins: string;
  Press?: () => void;
}

const DetailedCard: React.FC<DetailedProps> = ({
  imageUri = null,
  recipeLabel,
  recipeId,
  mins,
}) => {
  const [isSaved, setIsSaved] = useState(false);

  const { mutate } = useCreateOrUpdate({
    url: "/social/saved-recipe/create/",
  });

  const handleSave = (recipeId: string) => {
    setIsSaved(!isSaved);
    const data = { recipe: recipeId };
    mutate(data);
  };

  return (
    <View style={styles.card}>
      <View style={styles.upperSection}>
        <Image
          style={styles.circularImage}
          source={
            imageUri
              ? { uri: mediaUrl + imageUri }
              : require("../../assets/sample.png")
          }
        />
      </View>
      <View style={styles.lowerSection}>
        <View style={{ height: "100%", justifyContent: "space-between" }}>
          <View>
            <Text style={styles.recepieName}>{recipeLabel}</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View style={styles.timeText}>
              <Text>Time</Text>
              <Text>{mins}</Text>
            </View>

            <SavedBtn
              onSave={() => handleSave(recipeId)}
              isSaved={isSaved}
            ></SavedBtn>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 150,
    height: 230,
    borderRadius: 10,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "#CCCCCC",
    marginRight: 15,
  },
  upperSection: {
    height: "30%",
    backgroundColor: "white",
    zIndex: 2,
    position: "relative",
  },
  lowerSection: {
    flex: 1,
    backgroundColor: "rgba(217, 217, 217, 0.58)",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    paddingTop: 50,
    paddingBottom: 15,
    paddingLeft: 10,
    paddingRight: 10,
  },
  circularImage: {
    width: 120,
    height: 120,
    borderRadius: 100,
    position: "absolute",
    top: 0,
    left: "50%",
    transform: [{ translateX: -60 }],
  },
  recepieName: {
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
  },
  timeText: {
    alignItems: "flex-start",
    fontSize: 40,
    color: "black",
  },
});

export default DetailedCard;
