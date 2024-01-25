import { View, Text, StyleSheet,Image, TouchableOpacity } from 'react-native'
import React from 'react'

interface StepsCardProps {
    txtLabel: string;
    description: string;
    time? : string;
    Press?: () => void;
  }

const StepsCard: React.FC<StepsCardProps>  = ({txtLabel, description, time}) => {
  return (
    <View style={styles.slide}>
    <View style={{alignSelf:'center',marginTop:10}}><Image source={require('../assets/drag_handle.png')}></Image></View>
    <View style={styles.cardContainer}>
        
     
        <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           
        <Text style={styles.stepText}>{txtLabel}</Text>
        
        <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:5,marginBottom:15}}>
            <TouchableOpacity>
            <Image source={require('../assets/PencilLine.png')} style={{marginRight:10}}></Image>
            </TouchableOpacity>

            <TouchableOpacity>
            <Image source={require('../assets/Delete.png')} style={{marginRight:5}}></Image>
            </TouchableOpacity>
        </View>
        </View>
    
     <View>
        <Text style={styles.description}>
            {description}
        </Text>
        <Text style={styles.time}>{time}</Text>
     </View>
     </View>
     
     
    
    </View>
  )
}

const styles = StyleSheet.create({

    slide:{
        flexDirection:'row', 
        justifyContent:'space-between'
    },

    cardContainer:{
        marginTop: 20,
        paddingBottom: 10,
        height: 'auto',
        width: 310,
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        marginRight:20
    },
    stepText: {
        padding: 10,
        color:'black',
        fontWeight:'400'
    },
    description:{
        paddingLeft: 10,
        color: '#A9A9A9',

    },
    time:{
        paddingLeft: 10,
        color: '#A9A9A9',
        marginTop: 10,
        fontSize: 7,
        fontWeight: '400',
    }
})

export default StepsCard