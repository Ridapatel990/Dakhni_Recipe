import { View, Text, StyleSheet, TouchableOpacity, DimensionValue, ViewStyle, AnimatableNumericValue } from 'react-native'
import React from 'react'
import Icon  from 'react-native-vector-icons/Ionicons'
import LinearGradient  from 'react-native-linear-gradient'
import MaskedView from '@react-native-masked-view/masked-view';


interface BigButtonProps {
    btnLabel: string;
    btnWidth:DimensionValue;
    marginTop? : DimensionValue;
    btnHeight : DimensionValue;
    btnPosition?: 'absolute' | 'relative'  | undefined;
    btnBorder? : AnimatableNumericValue;
    Press?: () => void;
    icon?:string
  }


const BigButton: React.FC<BigButtonProps> = ({btnLabel,btnBorder, btnWidth,btnPosition= 'absolute', marginTop, btnHeight, Press,icon}) => {
   
  const styles = StyleSheet.create({
    gradient: {
        display: 'flex',
        flexDirection: 'row',
        overflow: 'hidden',
      },
      gradientText: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
            
      },
    
      button: {
        position: btnPosition,
        bottom: 20,
        alignSelf: 'center',
        height: btnHeight,
        width: btnWidth,
        textAlign:'center',
        marginTop: marginTop,
      },
      buttonGradient: {
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: btnBorder,
        paddingHorizontal: 20,
        paddingVertical: 14,
        justifyContent:'center'
      },
    
      buttonContent: {
        display:'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
      },
    
      buttonText: {
        color: 'white',
        fontWeight: '500',
        fontSize: 18,
        marginRight: 8,
        textAlign: 'center',
        
      },
      buttonIcon: {
        marginLeft: 5,
        
      },
 })
  return (
    
    <TouchableOpacity onPress={Press} style={styles.button}>
        
          <LinearGradient colors={['#FC1125', '#FF9300']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={styles.buttonGradient}>
            <View style={styles.buttonContent}>
              <Text style={styles.buttonText}>{btnLabel}</Text>
              { icon && <Icon name="arrow-forward" size={20} color="white" style={styles.buttonIcon} />}
            </View>
          </LinearGradient> 
        </TouchableOpacity>
  )
}



export default BigButton