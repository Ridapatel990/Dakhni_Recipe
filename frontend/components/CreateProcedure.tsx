import { View, Text, StyleSheet, ScrollView, Image, TextInput } from 'react-native'
import React, { useState } from 'react'
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import CustomTabs from './common/CustomTabs';
import StepsCard from './StepsCard';
import BottomNavigationBar from './BottomNavigationBar';
import { TouchableOpacity } from 'react-native';
import BigButton from './common/BigButton';
import CreateStepCard from './CreateStepCard'
import BottomBarContainer from '../pages/BottomBarContainer';
import RecipeCreatePage from '../pages/RecipeCreatePage';
import Input from '@ant-design/react-native/lib/input-item/Input';
import { useForm,useFieldArray,Control,useWatch } from 'react-hook-form';
// import Draggable from 'react-native-draggable';
// import {  NestableDraggableFlatList } from "react-native-draggable-flatlist"


interface ProcedureProps {

}
// const data =[{id:'1',text:'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'}]

const Procedure: React.FC<ProcedureProps> = ({ }) => {

  // const [tabText, setTabText] = useState<string | undefined>(undefined)
  
  //   const [inputFields, setInputFields] = useState<any>([]);
  
  //   const addInputField = () => {
  //     setInputFields([...inputFields, '']);
  //   };
  
  //   const handleInputChange = (text, index) => {
  //     const updatedFields = [...inputFields];
  //     updatedFields[index] = text;
  //     setInputFields(updatedFields);
  //   };

  <TouchableOpacity><View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, marginBottom: 10 }}><Image source={require('../assets/AddRecipe.png')}></Image>
      <Text style={{ color: 'black' }}>Add New</Text></View></TouchableOpacity>
  return (
    <SafeAreaView style={{ paddingBottom: 70 }}>

     <ScrollView style={{flexDirection: 'column',maxWidth:'100%',paddingVertical:10}}> 
     
       
       <View style={{ marginLeft: 10 }}> 
           <CreateStepCard txtLabel='Step 1' description={'Lorem Ipsum tempor incididunt ut labore et dolore,in voluptate velit esse cillum'} time='10 minutes ago'></CreateStepCard>
           
       </View> 


    <View style={{width:'90%',alignSelf:'center',marginTop:20}}>
               <Text style={{marginBottom:5,color:'black'}}>Step 3:</Text>
               <TextInput style={styles.Input}></TextInput>
             </View> 

             {/* <View>
      {inputFields.map((value, index) => (
        <TextInput
          key={index}
          value={value}
          onChangeText={(text) => handleInputChange(text, index)}
          placeholder={`Input ${index + 1}`}
        />
      ))}
      <TouchableOpacity onPress={addInputField}>
        <Text>Add Input Field</Text>
      </TouchableOpacity>
    </View> */}

             <TouchableOpacity><View style={{ flexDirection: 'row', marginLeft: 20, marginTop: 10, marginBottom: 10 }}><Image source={require('../assets/AddRecipe.png')}></Image>
      <Text style={{ color: 'black' }}>Add New</Text></View></TouchableOpacity>


     <View style={{ marginTop: 80 }}>
       <BigButton btnLabel={'Save'} btnHeight={50} btnWidth={90} btnBorder={10}></BigButton>
    </View>

    </ScrollView>



    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  header: {
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
  },

  Input: {
    borderColor: 'rgba(216, 219, 223, 1)',
    width: '100%',
    height: 100,
    borderWidth: 0.5,
    marginRight: 10,
  }

})

export default Procedure