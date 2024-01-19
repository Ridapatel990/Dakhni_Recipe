import React, { useState } from "react";
import { View, TouchableOpacity, Modal, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, ParamListBase } from "@react-navigation/native";

const Profile = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const handleIconPress = () => {
    setModalVisible(true);
  };

  const handleEdit = () => {
    // Perform action for edit
    setModalVisible(false); // Close the modal
    // Add logic for edit here
  };

  const handleLogout = async () => {
    await AsyncStorage.removeItem("userToken");
    await AsyncStorage.removeItem("user");
    setModalVisible(false);
    navigation.navigate("SignInPage");
  };

  return (
    <View style={{ alignSelf: "center", margin: 20 }}>
      <TouchableOpacity
        onPress={handleIconPress}
        style={{ flexDirection: "row" }}
      >
        <Text style={{ margin: 4, fontSize: 18, color: "black" }}>Profile</Text>
        <Icon name="chevron-down-sharp" size={30} color="#797979" />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(true);
        }}
      >
        <TouchableOpacity
          style={styles.centeredView}
          activeOpacity={1}
          onPressOut={() => {
            setModalVisible(false);
          }}
        >
          {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <TouchableOpacity style={styles.optionButton} onPress={handleEdit}>
              <Icon name="settings" size={20}></Icon>
              <Text style={styles.optionText}>Edit</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.optionButton}
              onPress={handleLogout}
            >
              <Icon name="power-sharp" size={20}></Icon>
              <Text style={styles.optionText}>Logout</Text>
            </TouchableOpacity>
          </View>
          {/* </View> */}
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    // justifyContent: 'center',
    alignItems: "center",
    marginTop: 82,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  optionButton: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    width: 100,
    alignItems: "center",
    flexDirection: "row",
    columnGap: 5,
  },
  optionText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default Profile;
