import { View, Text, TouchableOpacity, StyleSheet, DimensionValue, Image } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient';

interface FilterButtonProps {
    // btnLabel: string;
    btnWidth:DimensionValue;
    marginTop? : DimensionValue;
    btnPosition?: 'absolute' | 'relative'  | undefined;
    Press?: () => void;
  }

const FilterButton: React.FC<FilterButtonProps> = ({btnWidth, btnPosition = 'relative', marginTop, Press}) => {
    const styles = StyleSheet.create({
        gradient: {
            display: 'flex',
            flexDirection: 'row',
            overflow: 'hidden',
          },
          button: {
            flexDirection: 'row',
            position: btnPosition,
            bottom: 20,
            alignSelf: 'center',
            height: 40,
            width: btnWidth,
           marginTop: 50,
           marginLeft: 10
          },
          buttonGradient: {
            flexDirection: 'row',
            alignItems: 'center',
            borderRadius: 8,
            paddingHorizontal: 20,
            paddingVertical: 14,
            justifyContent:'center'
          },
        })
  return (
    <TouchableOpacity style= {styles.button} onPress={Press}>
        <LinearGradient colors={['#FC1125', '#FF9300']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.buttonGradient}>
            <View style= {{padding: 5}}>
              <Image  source={require('../../assets/filter.png')} />
              
            </View>
          </LinearGradient>
    </TouchableOpacity>
     
  )
}

export default FilterButton