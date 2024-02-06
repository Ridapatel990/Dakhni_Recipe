import React, { useEffect,useState } from 'react';
import {View,Text,ScrollView, TouchableOpacity} from "react-native"
import BigCard from '../components/common/BigCard'
import StarCustomTab from "../components/common/StarCustomTab";
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import BigButton from '../components/common/BigButton';
import CustomTabs from '../components/common/CustomTabs';
import IngredientsList from '../components/IngredientList'
import CircularAvatar from '../components/CircleAvatar';
import Procedure from '../components/Procedure';
import { useGetAll } from '../hooks';
import ReviewPage from './ReviewPage';

const  RecipeDescription= ({navigation}:{navigation:NavigationProp<ParamListBase>}) =>{
    const [searchText, setSearchText] = useState('');
    const [tabText, setTabText] = useState<string | undefined>(undefined);
    const [chipText, setChipText] = useState<string | undefined>(undefined);
    const [selectedTab, setSelectedTab] = useState(0);
    const [longTabText, setLongTabText] = useState<string | undefined>(undefined);



  let list;
  if (longTabText === 'Ingredients' ) {
    list = <IngredientsList></IngredientsList>
  } else {
    list = <Procedure></Procedure>
    
  }

   const {data : getRecipe} = useGetAll ({
    key:'/recipes/list/?random=true',
    select:(data:any) => data?.data,
    onSuccess: (data) => {
    
    },
   });

    return (
      <ScrollView>
      <View style={{flexDirection:'row',alignSelf:'center',marginBottom:20}}>
      
      
      <BigCard time='30 min' BigCardName='Biryani' BigCardWidth={360} Review='13k Reviews' recipeId=''></BigCard>
      
        </View>

        <View style={{flexDirection:'row',width:256,alignSelf:'center',justifyContent:'space-between'}}>
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <StarCustomTab tabBorderColor='gray' label={'Share'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="share" shareComponent='shareComponent'></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column',width:'30%'}}> */}
        <StarCustomTab tabBorderColor='gray' label={'Rate Recipe'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="rate" rateComponent='rateComponent'></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <TouchableOpacity >
        <StarCustomTab tabBorderColor='gray' label={'Reviews'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="share" Press={()=>navigation.navigate('ReviewPage')}></StarCustomTab></TouchableOpacity>
        {/* </View> */}
        </View>
        
        

        


        <View style={{marginTop: 30, flexDirection: 'row',alignSelf:'center'}}>
        
          <CustomTabs defaultSelected={true} label={'Ingredients'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
          
          
          <CustomTabs label={'Procedure'} width={'40%'} height={42} margin={4} selected={longTabText} setSelected={setLongTabText}></CustomTabs>
        </View>

         <View>
        {list}
        </View>

        </ScrollView>
    );
  };
  
  export default RecipeDescription;