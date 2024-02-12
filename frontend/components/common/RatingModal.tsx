import {
  View,
  Text,
  StyleSheet,
  Image,
  Modal,
  TouchableOpacity,
  ToastAndroid,
} from "react-native";
import React, { useState } from "react";
import LinearGradient from "react-native-linear-gradient";
import { Rating } from "react-native-ratings";
import { useCreateOrUpdate } from "../../hooks";

interface RatingModal {
  RecipeId: string;
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  toggleModal: () => void;
}

const RatingModal: React.FC<RatingModal> = ({
  RecipeId,
  modalVisible,
  setModalVisible,
  toggleModal,
}) => {
  const imageComponents = Array.from({ length: 5 }, (_, index) => (
    <Image key={index} source={require("../../assets/rateStar.png")} />
  ));

  //   const [modalVisible, setModalVisible] = useState(false);

  //   const toggleModal = () => {
  //     setModalVisible(!modalVisible);
  //   };

  const styles = StyleSheet.create({
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    backdrop: {
      flex: 1,
    },
  });

  const [rating, setRating] = useState(0);

  const RatingCompleted = (rating: any) => {
    setRating(rating);
  };

  const { mutate } = useCreateOrUpdate({
    url: "/social/rate-recipe/create/",
    onSuccess() {
      ToastAndroid.show("Rating Successful", ToastAndroid.SHORT);
      setModalVisible(false);
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={toggleModal}
      presentationStyle="overFullScreen"
    >
      <View style={styles.modalBackdrop}>
        <TouchableOpacity
          style={styles.backdrop}
          onPress={() => setModalVisible(false)}
        />
      </View>

      <View
        style={{
          flexDirection: "column",
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            width: "90%",
            // height: "30%",
            borderRadius: 10,
            flexDirection: "column",
            alignSelf: "center",
          }}
        >
          <TouchableOpacity onPress={toggleModal}>
            <Image
              style={{
                alignSelf: "flex-end",
                margin: 5,
                height: 20,
                width: 20,
              }}
              source={require("../../assets/Close.png")}
            ></Image>
          </TouchableOpacity>
          <View style={{ alignSelf: "center", margin: 30 }}>
            <Text style={{ fontSize: 25 }}>Rate Recipe</Text>
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "center",
              width: "100%",
              height: "auto",

              //   alignSelf: "center",
            }}
          >
            {/* {imageComponents} */}
            <Rating
              showRating
              onFinishRating={RatingCompleted}
              startingValue={0}
              style={{ paddingVertical: 10, gap: 5 }}
              fractions={1}
              jumpValue={0.5}
            />
          </View>

          <View style={{ flexDirection: "column" }}>
            <TouchableOpacity
              style={{
                width: 70,
                height: 50,
                marginTop: 30,
                alignSelf: "center",
              }}
            >
              <LinearGradient
                colors={["#FC1125", "#FF9300"]}
                start={{ x: 0, y: 0 }}
                end={{ x: 0, y: 1 }}
                style={{ borderRadius: 10 }}
              >
                <View>
                  <Text
                    style={{
                      fontSize: 20,
                      margin: 4,
                      color: "white",
                      alignSelf: "center",
                    }}
                    onPress={() => mutate({ rate: rating, recipe: RecipeId })}
                  >
                    Send
                  </Text>
                </View>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};
export default RatingModal;
