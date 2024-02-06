import { View, Text, StyleSheet,Image } from 'react-native'
import React from 'react'
import TimeAgo from 'react-native-timeago'
import moment from 'moment'
import { NotificationInterface } from '../interfaces'


const Notification: React.FC<{data: NotificationInterface }>  = ({data}:{data:NotificationInterface}) => {

  return (
    
    <View style={styles.cardContainer}>
        
     <View>
        <Text style={styles.stepText}>{data.recipe?.name}</Text>
     </View>
     <View style={styles.description}>
        <Text>{data.recipe.id}</Text>
     </View>
     <View style={styles.time}>
        <TimeAgo time={data.created_on}></TimeAgo>
        {/* <Text style={styles.time}>{time}</Text> */}
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
        width: 320,
        backgroundColor: '#D9D9D9',
        borderRadius: 12,
        marginRight:10,
        alignSelf:'center'
    },
    stepText: {
        padding: 10,
    },
    description:{
        paddingLeft: 10,
        color: '#A9A9A9',

    },
    time:{
        paddingRight: 10,
        color: '#A9A9A9',
        marginTop: 10,
        fontSize: 7,
        fontWeight: '400',
        alignSelf:'flex-end'
    }
})

export default Notification