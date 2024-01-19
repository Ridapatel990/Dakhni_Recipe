import React, { useEffect,useState } from 'react';
import {View,Text,ScrollView} from "react-native"
import BigCard from '../components/common/BigCard'
import StarCustomTab from "../components/common/StarCustomTab";
import {NavigationProp, ParamListBase} from '@react-navigation/native';
import BigButton from '../components/common/BigButton';
import CustomTabs from '../components/common/CustomTabs';
import IngredientsList from '../components/IngredientList'
import CircularAvatar from '../components/CircleAvatar';
import Procedure from '../components/Procedure';

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

    return (
      <ScrollView>
      <View style={{flexDirection:'row',alignSelf:'center',marginBottom:20}}>
      
      <BigCard BigCardName='Biryani' BigCardWidth={360} Review='13k Reviews'></BigCard>
      
        </View>

        <View style={{flexDirection:'row',width:256,alignSelf:'center',justifyContent:'space-between'}}>
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <StarCustomTab tabBorderColor='gray' label={'Share'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="share"></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column',width:'30%'}}> */}
        <StarCustomTab tabBorderColor='gray' label={'Rate Recipe'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="rate"></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <StarCustomTab tabBorderColor='gray' label={'Reviews'}  width={'auto'} height={32} margin={3} selected={tabText} setSelected={setTabText} image="share"></StarCustomTab>
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