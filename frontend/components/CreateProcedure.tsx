import { View, Text, StyleSheet, ScrollView ,Image} from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabs from './common/CustomTabs';
import StepsCard from './StepsCard';
import BottomNavigationBar from './BottomNavigationBar';
import { TouchableOpacity } from 'react-native';
import BigButton from './common/BigButton';
import CreateStepCard from './CreateStepCard'


interface ProcedureProps{
  
}

const Procedure: React.FC<ProcedureProps>  = ({}) => {
    
    // const [tabText, setTabText] = useState<string | undefined>(undefined)
  return (
   <SafeAreaView style={{paddingBottom: 70}}>
    
    <ScrollView style={{flexDirection: 'column',maxWidth:'100%',paddingVertical:10}}>

        <View style={{marginLeft:10}}>
            <CreateStepCard txtLabel='Step 1' description={'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'} time='10 minutes ago'></CreateStepCard>
            <CreateStepCard txtLabel='Step 1' description={'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'} time='10 minutes ago'></CreateStepCard>
            <CreateStepCard txtLabel='Step 1' description={'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'} time='10 minutes ago'></CreateStepCard>
            <CreateStepCard txtLabel='Step 1' description={'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'} time='10 minutes ago'></CreateStepCard>
            
            


             <TouchableOpacity><View style={{flexDirection:'row',justifyContent:'center',marginRight:20,marginTop:20,marginBottom:10}}><Image source={require('../assets/AddRecipe.png')}></Image>
               <Text style={{color:'black'}}>Add New Step</Text></View></TouchableOpacity>
        </View>
        <View style={{marginTop:80}}>
        <BigButton btnLabel={'Save'} btnHeight={50} btnWidth={90} btnBorder={10}></BigButton>
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

export default Procedure