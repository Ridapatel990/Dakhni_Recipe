import { View, Text, TouchableOpacity, StyleSheet, DimensionValue, Image, SafeAreaView, ImageBackground } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';


interface GradientProps {
    gradientWidth?:DimensionValue;
    gradientHeight?:DimensionValue;
  }

const Gradient: React.FC<GradientProps> = ({gradientHeight=70,gradientWidth=70}) => {


  
    return(
        <SafeAreaView style={{position:'absolute',zIndex:3}}>
        
        
        <View style={{padding:10,}}>
        <LinearGradient colors={['rgba(252, 17, 37, 1)', 'rgba(255, 147, 0, 1)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{height:gradientHeight,width:gradientWidth}}>
        
        
          </LinearGradient>
          </View>
          
        
        
        </SafeAreaView>
    )
}
export default Gradient