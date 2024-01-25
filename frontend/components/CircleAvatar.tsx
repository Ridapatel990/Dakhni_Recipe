import React from "react";
import { View,Text,Image,ImageBackground, ImageURISource, StyleSheet,DimensionValue } from "react-native";


interface CircularAvatarProps {
    image?: string | null;
    height?:DimensionValue;
    width?:DimensionValue
  }


  const Assets: {[key:string]:ImageURISource}= {
    'photo':require('../assets/profilePhoto.png'),
    // 'share':require('../../assets/ShareIcon.png'),
    // 'rate':require('../../assets/blackStar.png'),
    // 'review':require('../../assets/Review.png'),
}

const CircularAvatar : React.FC<CircularAvatarProps> = ({image,height,width}) =>{

    const styles=StyleSheet.create({
        profileImage:{
            height:height,
            width:width,
            alignSelf:'center',
            borderRadius:90
        }
    })
    

    return(
        <View >
            <View style={{marginTop:0}}>
        {image && <Image source={Assets[image]} style={styles.profileImage}></Image>}</View>
        </View>
    );
}
export default CircularAvatar