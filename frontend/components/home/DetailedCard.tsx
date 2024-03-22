import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SavedBtn from "../SavedBtn";
import { mediaUrl } from "../../utils/urls";
import { useCreateOrUpdate } from "../../hooks";
import RatingChip from "../RatingChip";

interface DetailedProps {
  imageUri?: string;
  recipeLabel: string;
  recipeId: string;
  is_saved: boolean;
  mins: string;
  Rating?: string;
  Press?: () => void;
}

const DetailedCard: React.FC<DetailedProps> = ({
  imageUri = null,
  is_saved = false,
  recipeLabel,
  recipeId,
  mins,
  Rating,
  Press,
}) => {
  const [isSaved, setIsSaved] = useState(is_saved);

  const { mutate } = useCreateOrUpdate({
    url: "/social/saved-recipe/create/",
  });

  const handleSave = (recipeId: string) => {
    setIsSaved(!isSaved);
    mutate({ recipe: recipeId });
  };

  return (
    <TouchableOpacity onPress={Press}>
      
      <View style={styles.card}>
      <View style={{flexDirection:"column",alignSelf:"flex-end",paddingBottom:10}}>
      <RatingChip Rating={Rating} />
      </View>
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
             <View>
                <Text style={styles.timeText}>Time</Text>
                <Text style={{fontSize:15,color:"rgba(72, 72, 72, 1)",fontWeight:"300",fontFamily:"Satoshi Variable",paddingTop:5}}>{mins}</Text>
              </View>
              
              <SavedBtn
                onSave={() => handleSave(recipeId)}
                isSaved={isSaved}
              ></SavedBtn>
            </View>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 170,
    height: 270,
    borderRadius: 10,
    overflow: "hidden",
    // borderWidth: 1,
    borderColor: "#CCCCCC",
    marginRight: 15,
  },
  upperSection: {
    height: "25%",
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
    width:"100%"
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
    paddingTop:10,
    textAlign: "center",
    fontSize: 14,
    fontWeight: "400",
    
  },
  timeText: {
    alignItems: "flex-start",
    fontSize: 15,
    color:"rgba(169, 169, 169, 1)",
    fontWeight:"400"
  },
});

export default DetailedCard;
