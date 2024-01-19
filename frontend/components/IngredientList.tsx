import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabs from './common/CustomTabs';
import StepsCard from './StepsCard';
import BottomNavigationBar from './BottomNavigationBar';
import Ingredient from './Ingredient'

const IngredientsList = () => {
    
    const [tabText, setTabText] = useState<string | undefined>(undefined)
  return (
   <SafeAreaView style={{paddingBottom: 70}}>
    
    <ScrollView style={{flexDirection: 'column',maxWidth:'100%',paddingVertical:10}}>

        <View style={{margin: 20}}>
            <Ingredient name='Rice' image='rice' quantity='500g'></Ingredient>
            <Ingredient name='Chicken' image='chicken' quantity='200g'></Ingredient>
            <Ingredient name='Egg' image='egg' quantity='10'></Ingredient>
            <Ingredient name='Tomatoes' image='tomato' quantity='5'></Ingredient>
        </View>
        </ScrollView>
    
    
    
  </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
        flex: 1 },

    header:{
        fontWeight: '500',
      fontSize: 20,
      color: 'black',
      alignSelf: 'center',
      margin: 10,
  
    },

    todayText: {
        fontWeight: '300',
      fontSize: 12,
      color: 'black',
      alignSelf: 'center',
    //   margin: 10,
    }

})

export default IngredientsList