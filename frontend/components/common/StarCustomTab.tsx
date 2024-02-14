import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  DimensionValue,
  Image,
  ImageURISource,
  Modal,
} from "react-native";
import React, { ReactNode, useEffect, useState } from "react";
import BigButton from "./BigButton";
import InputField from "./InputField";
import RatingModal from "./RatingModal";

interface CustomTabsProps {
  label: string;
  width: DimensionValue;
  height?: DimensionValue;
  margin?: DimensionValue;
  selected: string | undefined;
  setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
  disabled?: boolean;
  defaultSelected?: boolean;
  image?: string;
  activeImage?: string;
  tabBorderColor?: string;
  shareComponent?: string;
  RateComponent?: boolean;
  RateComponentProps?: any;
  RateCallBack?: () => void;
  Press?: () => void;
  setBg?: boolean;
  setColor?: boolean;
}

const Assets: { [key: string]: ImageURISource } = {
  star: require("../../assets/gradientstar.png"),
  "white-star": require("../../assets/whiteStar.png"),
  share: require("../../assets/share.png"),
  rate: require("../../assets/blackStar.png"),
  review: require("../../assets/Review.png"),
};
const StarCustomTab: React.FC<CustomTabsProps> = ({
  label,
  width,
  height = 30,
  margin,
  selected,
  setSelected,
  disabled = false,
  defaultSelected = false,
  image,
  activeImage,
  tabBorderColor,
  shareComponent,
  RateComponent,
  RateComponentProps,
  RateCallBack,
  Press,
  setBg,
  setColor,
}) => {
  const chipColor =
    selected === label
      ? setBg
        ? "white"
        : "red"
      : disabled
      ? "black"
      : "white";
  const labelColor =
    selected === label || disabled ? (setColor ? "black" : "white") : "black";

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const imageComponents = Array.from({ length: 5 }, (_, index) => (
    <Image key={index} source={require("../../assets/rateStar.png")} />
  ));

  useEffect(() => {
    // Set the first tab as selected by default when the component mounts
    if (defaultSelected) {
      setSelected(label);
    }
  }, []);

  useEffect(() => {
    if (!modalVisible) {
      RateCallBack && RateCallBack();
    }
  }, [modalVisible]);

  const styles = StyleSheet.create({
    modalBackdrop: {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    backdrop: {
      flex: 1,
    },
    tabs: {
      marginRight: 4,
      zIndex: 3,
      bottom: 5,
      flexDirection: "row",
      width: width,
      justifyContent: "space-evenly",
      borderRadius: 10,
      borderWidth: 1,
      height: height,
      // borderColor: '#FC1125',
    },
    labelText: {
      color: "black",
      fontWeight: "300",
      fontSize: 12,
      alignSelf: "flex-end",
      margin: 6,
    },
  });

  const handlePress = () => {
    if (!disabled) {
      setSelected(label);
      toggleModal(); // Show the pop-up when the tab is pressed
      Press && Press();
    }
    // Logic
  };

  return (
    <View>
      <TouchableOpacity
        style={[
          styles.tabs,
          {
            backgroundColor: chipColor,

            borderColor:
              selected !== label
                ? tabBorderColor
                  ? tabBorderColor
                  : "red"
                : "gray",
          },
        ]}
        onPress={handlePress}
        disabled={disabled}
      >
        <View style={{ overflow: "hidden", borderRadius: 10, zIndex: 10,alignSelf:'center',marginLeft:3 }}>
          <Text style={[styles.labelText, { color: labelColor }]}>{label}</Text>
        </View>
        <View style={{ alignSelf: "flex-start", marginTop: 7,marginRight:5 }}>
          {image && (
            <Image
            style={{width:16,height:15}}
              source={
                activeImage
                  ? selected === label
                    ? Assets[activeImage]
                    : Assets[image]
                  : Assets[image]
              }
            ></Image>
          )}
        </View>
      </TouchableOpacity>

      {shareComponent && (
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

          {/* <View style={styles.modalContent}> */}

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
                height: "30%",
                borderRadius: 10,
                flexDirection: "column",
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  height: 50,
                  width: 310,
                  marginLeft: 5,
                  marginTop: 15,
                }}
              >
                <Text
                  style={{
                    alignSelf: "flex-start",
                    fontSize: 20,
                    color: "black",
                    fontWeight: "400",
                    marginLeft: 15,
                  }}
                >
                  Recipe Link
                </Text>
                <TouchableOpacity onPress={toggleModal}>
                  <Image
                    style={{
                      alignSelf: "flex-start",
                      marginBottom: 5,
                      height: 20,
                      width: 20,
                    }}
                    source={require("../../assets/Close.png")}
                  ></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{ flexDirection: "row", marginLeft: 20, width: "90%" }}
              >
                <Text style={{ fontSize: 14 }}>
                  Copy Recipe Link and Share with your Family and Friends
                </Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  width: "80%",
                  height: 105,
                }}
              >
                <View
                  style={{
                    alignSelf: "flex-start",
                    marginRight: 5,
                    width: 240,
                  }}
                >
                  <InputField></InputField>
                </View>
                <View style={{ alignSelf: "flex-end", marginRight: 10 }}>
                  <BigButton
                    btnLabel="Copy"
                    btnHeight={50}
                    btnWidth={90}
                    btnBorder={10}
                  ></BigButton>
                </View>
              </View>
            </View>
          </View>

          {/* </View>
      </View> */}
        </Modal>
      )}

      {RateComponent ? (
        <RatingModal
          {...RateComponentProps}
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          toggleModal={toggleModal}
        />
      ) : (
        ""
      )}
    </View>
  );
};

export default StarCustomTab;
