import React from "react";
import { useState } from "react";
import { View,Image,Text, TouchableOpacity, ScrollView } from "react-native";
import InputField from "./common/InputField";
import RecipeChipComponenet from "./RecipeChipComponent";
import BigButton from "./common/BigButton";
import CustomTabs from "./common/CustomTabs";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownList from "./DropDownList";


const Recipe= () =>{

    const [longTabText, setLongTabText] = useState<string | undefined>(undefined);
    
    return(
    //  <View> 
<ScrollView style={{height:'100%'}}>
            
            
        <View style={{flexDirection:'column',width:'100%',marginBottom:60}}>
            <View style={{marginTop:9,backgroundColor:'rgba(220, 220, 220, 0.4)',width:'90%',height:300,justifyContent:'center',alignSelf:'center',borderRadius:10}}>
                <TouchableOpacity>
                    <View>
                <Image source={require('../assets/UploadIcon.png')} style={{alignSelf:'center'}}></Image>
                <Text style={{alignSelf:'center',fontSize:13,fontWeight:'200'}}>Uplaod Image</Text>
                </View>
                </TouchableOpacity>
              </View>

            <View style={{width:'100%',paddingHorizontal:20}}>
            <InputField  style={{marginRight:0,marginLeft:0}}></InputField>
            </View>
            </View>
            <View style={{bottom:50}}>

                <RecipeChipComponenet image="clock" title="Cook Time(Min)" component="{component}"></RecipeChipComponenet>
                <RecipeChipComponenet image="serves" title="Serves" component="{component}"></RecipeChipComponenet>
                <RecipeChipComponenet image="serves" title="Serves"></RecipeChipComponenet>

                


            </View>
            <DropDownList></DropDownList>

            
                        <View style={{flexDirection: 'row',alignSelf:'center'}}>
                    
                    <CustomTabs defaultSelected={true} label={'Ingredients'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
                    
                    
                    <CustomTabs label={'Procedure'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
                         </View>

        </ScrollView>
        // {/* </View> */}
        
        
        
    )
} 
export default Recipe