import React from "react";
import { View,Image, Text, StyleSheet } from "react-native";
import { ImageURISource } from "react-native";

interface IngredientProps{
    name:string,
    image:string,
    quantity:string
}

const Assets: {[key:string]:ImageURISource}= {
    'rice':require('../assets/Rice.png'),
    'chicken':require('../assets/Chicken.png'),
    'egg':require('../assets/Egg.png'),
    'tomato':require('../assets/Tomato.png'),
}

const Ingredient: React.FC<IngredientProps> = ({name,image,quantity}) =>{
    return(
        <View>
            <View style={styles.mainView}>
                <View style={styles.imgtext}>
                {image && <Image source={Assets[image]} ></Image>}
                    <Text style={{alignSelf:'center',paddingLeft:5}}>{name}</Text>
                </View>
                <View style={styles.quantity}>
                    <Text >{quantity}</Text>
                </View>
            </View>
        </View>
    )
}

const styles=StyleSheet.create({
    mainView:{
        justifyContent:'space-between',
        flexDirection:'row',
        backgroundColor:'rgba(220, 220, 220, 0.4)',
        height:80,
        borderRadius:10,
        marginBottom:10,
        
    },

    imgtext:{
        justifyContent:'space-between',
        flexDirection:'row',
        alignSelf:'center',
        marginLeft:10
    },

    quantity:{
        marginRight:10,
        flexDirection:'column',
        justifyContent:'center'
    },

})
export default Ingredient