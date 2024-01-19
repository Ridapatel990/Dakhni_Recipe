import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import Icon from "react-native-vector-icons/Ionicons";

interface SavedBtnProps {
  onSave: () => void;
  isSaved: boolean;
}

const SavedBtn: React.FC<SavedBtnProps> = ({ onSave, isSaved }) => {
  return (
    <TouchableOpacity onPress={onSave}>
      <View style={styles.viewArea}>
        <Icon
          name={isSaved ? "bookmark" : "bookmark-outline"}
          size={18}
          color={isSaved ? "red" : "grey"}
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  viewArea: {
    borderRadius: 100,
    padding: 8,
    backgroundColor: "white",
    height: 35,
    width: 35,
  },
  savedView: {
    backgroundColor: "red",
  },
});

export default SavedBtn;
