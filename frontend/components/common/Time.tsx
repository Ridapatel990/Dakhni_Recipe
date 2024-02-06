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
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
// import FastImage from 'react-native-fast-image';
// import { BlurView } from '@react-native-community/blur';
import SavedBtn from "../SavedBtn";
import { useCreateOrUpdate } from "../../hooks";
// import {BlurView} from 'expo-blur';

interface TimeProps {
  Time?: string;
  recipeId: string;
}

const TimeProps: React.FC<TimeProps> = ({ Time = "0", recipeId }) => {
  const [isSaved, setIsSaved] = useState(false);

  const { mutate } = useCreateOrUpdate({
    url: "/social/saved-recipe/create/",
  });

  const handleSave = (recipeId: string) => {
    setIsSaved(!isSaved);
    const data = { recipe: recipeId };
    mutate(data);
  };
  const styles = StyleSheet.create({
    chip: {
      height: 40,
      width: 45,
      alignSelf: "center",
      borderRadius: 50,
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      padding: 2,
      alignContent: "flex-start",
    },
    timeText: {
      fontSize: 15,
      color: "white",
      textAlign: "center",
      paddingTop: 7,
      alignSelf: "center",
      paddingBottom: 3,
    },

    blurOverlay: {
      width: 50,
      height: 30,
      opacity: 0.7,
      zIndex: 1,
      // marginBottom:5,
    },
  });

  return (
    <SafeAreaView
      style={{
        position: "absolute",
        zIndex: 3,
        left: 5,
        bottom: 5,
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-between",
      }}
    >
      {/* <View> */}

      <View
        style={{
          overflow: "hidden",
          borderRadius: 10,
          backgroundColor: "rgba(48, 48, 48, 0.3)",
          zIndex: 10,
          width: 60,
        }}
      >
        {/* <BlurView 
        style={styles.blurOverlay}
        blurType="light"
        blurAmount={10}
        reducedTransparencyFallbackColor="white">
        </BlurView> */}
        <Text style={styles.timeText}>{Time}</Text>
      </View>
      <View style={{ marginRight: 15, marginBottom: 4 }}>
        <SavedBtn
          onSave={() => handleSave(recipeId)}
          isSaved={isSaved}
        ></SavedBtn>
      </View>
      {/* </View> */}
    </SafeAreaView>
  );
};
export default TimeProps;
