import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import CircularAvatar from '../components/CircleAvatar'
import { Image } from 'react-native'
import { InputAccessoryView } from 'react-native'
import InputField from '../components/common/InputField'
import BigButton from '../components/common/BigButton'




const EditProfilePage = () => {


  const styles=StyleSheet.create({
    
    edit:{
      fontSize:23,
      alignSelf:'flex-start',
      width:150,
      color:'black',
      margin:10,
      fontWeight:'400'
    },

    profile:{
      backgroundColor:'rgba(238, 238, 238, 1)',
      borderRadius:100,
      height:200,
      width:200,
      alignSelf:'center',
      flexDirection:'row'
    },
    input:{
      width:'100%',
      alignSelf:'center',
    }
    
  })
  return (
    <View>

      <View style={{margin:20}}>
      <Text style={styles.edit}>Edit Profile</Text>
      </View>

      <View style={{alignSelf:'center',width:200,marginBottom:20}}>
        <View style={styles.profile}>
          <TouchableOpacity style={{alignSelf:'flex-end',width:200}}>
            <Image style={{alignSelf:'flex-end',width:50,height:50}} source={require('../assets/EditPen.png')}>
            </Image>
          </TouchableOpacity></View>
      </View>

      <View style={styles.input}>
        <InputField textforInput='Name'></InputField>
        <InputField textforInput='Email'></InputField>
        <InputField textforInput='Profession'></InputField>
        <InputField textforInput='Description'></InputField>
        </View>

        <View style={{marginTop:50}}>
          <BigButton btnLabel='Save' btnHeight={70} btnWidth={100} btnPosition='relative' btnBorder={10}></BigButton>
        </View>

    </View>
  )
}



export default EditProfilePage