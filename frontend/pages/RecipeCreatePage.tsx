import React from "react";
import { useState } from "react";
import { View,Image,Text, TouchableOpacity, ScrollView } from "react-native";
import InputField from "../components/common/InputField";
import RecipeChipComponenet from "../components/RecipeChipComponent";
import BigButton from "../components/common/BigButton";
import CustomChips from "../components/common/CustomChips";
import { SafeAreaView } from "react-native-safe-area-context";
import DropDownList from "../components/DropDownList";
import CustomTabs from "../components/common/CustomTabs";
import Procedure from "../components/Procedure";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Ingredient from "../components/Ingredient";
import IngredientsList from "../components/IngredientList";

const Recipe= ({navigation}:{navigation:NavigationProp<ParamListBase>}) => {
    const onItemTapped = (index: number) => {
        switch (index) {
          case 0: 
          navigation.navigate('HomeScreen');
          break;
          case 1: 
          navigation.navigate('SavedRecipePage');
          break;
          case 3: 
          navigation.navigate('NotificationPage');
          break;
          case 4: 
          navigation.navigate('AccountPage');
          break;
          
          default:
           
            break;
        }
    };

    const [longTabText, setLongTabText] = useState<string | undefined>(undefined);
    
    let list;
    if (longTabText === 'Ingredients' ) {
      list = <Text>Ingredients</Text>
    } else {
      list = <Procedure addStep="{addStep}" saveButton="saveButton"></Procedure>
      
    }

    return(
     <View> 
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
            <View style={{bottom:20}}>

                <RecipeChipComponenet image="clock" title="Cook Time(Min)" component="{component}"></RecipeChipComponenet>
                <RecipeChipComponenet image="serves" title="Serves" component="{component}"></RecipeChipComponenet>
                <RecipeChipComponenet image="category" title="Category" dropdowncomp="{dropdownlist}"></RecipeChipComponenet>

                

                


            </View>
            {/* <DropDownList></DropDownList> */}

            
                        <View style={{flexDirection: 'row',alignSelf:'center',marginBottom:10}}>
                    
                    <CustomTabs defaultSelected={true} label={'Ingredients'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
                    
                    
                    <CustomTabs label={'Procedure'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
                    </View>
                    
                    

        <View style={{flexDirection:'column',marginLeft:10}}>
        {list}
                          
        </View>

        

        
                   


        <View style={{ marginTop: 70 }}>
        <BottomNavigationBar
          onItemTapped={onItemTapped}
          selectedIndex={0}
        ></BottomNavigationBar>
      </View>

        </ScrollView>
        
      </View>
        // {/* </View> */}
        
        
        
    )
} 
export default Recipe