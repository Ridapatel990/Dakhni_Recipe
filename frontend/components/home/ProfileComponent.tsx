import React from "react";
import CircularAvatar from "../CircleAvatar";
import { View ,Text, StyleSheet, ScrollView} from "react-native";

interface ProfileProps {
    Name?:string,
    Label?:string,
    Description?:string
  }


  const ProfileComponent: React.FC<ProfileProps> = ({
    Name='Elena',
    Label='Chef',
    Description='Lorem, ipsum dolor sit amet !'
  }) => {

    const styles=StyleSheet.create({
        Name:{
          fontSize:25,
          alignSelf:'center',
          marginTop:10
        },

        Label:{
          fontSize:15,
          alignSelf:'center',
          marginTop:10
        },

        Description:{
          fontSize:15,
          alignSelf:'center',
          marginTop:10
        },
    })
    return(
      <View>
      <View style={{flexDirection: "column"}}>
            <CircularAvatar image="photo"></CircularAvatar>
            <Text style={{...styles.Name}}>{Name}</Text>
            
        </View>
        <View>
          <ScrollView>
        <Text style={{...styles.Label}}>{Label}</Text>
        <Text style={{...styles.Description}}>{Description}</Text>
        </ScrollView>
        </View>
        </View>
        
    )
  }
  export default ProfileComponent
