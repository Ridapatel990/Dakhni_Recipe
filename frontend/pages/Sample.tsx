import React, { useState } from 'react';
import { Image } from 'react-native';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const App = () => {
  const [isPressed, setIsPressed] = useState(false);

  const handlePress = () => {
    setIsPressed(true);
    // You can add additional logic here if needed
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePress} activeOpacity={0.7}>
        <View style={[styles.object, isPressed && styles.pressedObject]}>
          <Image source={require("../assets/Card.png")}></Image>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  object: {
    width: 100,
    height: 100,
    backgroundColor: 'blue',
    // Define other styles for your object
  },
  pressedObject: {
    opacity: 0.5, // Decrease opacity when pressed
    // You can add other styles to decrease brightness
  },
});

export default App;
