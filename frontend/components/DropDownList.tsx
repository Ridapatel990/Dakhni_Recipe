import React, { Component } from 'react';
import { View,StyleSheet ,Image,ImageURISource,Text,ScrollView} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useState } from 'react';
import { RecipeDetailInterface } from '../interfaces';
import { useGetAll } from '../hooks';


export type DimensionValue =
  | number
  | 'auto'
  | `${number}%`
  | null;


type FlexAlignType =
  | 'flex-start'
  | 'flex-end'
  | 'center'
  | 'stretch'
  | 'baseline';

interface FlexStyle {
  alignContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'stretch'
    | 'space-between'
    | 'space-around'
    | undefined;
  alignItems?: FlexAlignType | undefined;
  maxWidth?: DimensionValue | undefined;
  backgroundColor?:string;
  maxHeight?: DimensionValue | undefined;

}

const stylelistCotainerProp:FlexStyle ={
  alignContent:'flex-start',
  maxWidth:300,
  maxHeight :500
}

const stylelistItem:FlexStyle={
  maxWidth:300,
  maxHeight :500
}

interface DropDownListProps{
  createCategory?:string;
  setCreateCategory?:any
}

const  DropDownList:React.FC<DropDownListProps>  =({
  createCategory,
  setCreateCategory
})=> {


    const [selectedItems,setSelectedItems] = useState<any[]>([])

  let items = [{
    id: '92iijs7yta',
    name: 'Ondo',
  }, {
    id: 'a0s0a8ssbsd',
    name: 'Ogun',
  }, {
    id: '16hbajsabsd',
    name: 'Calabar',
  }, {
    id: 'nahs75a5sg',
    name: 'Lagos',
  }, {
    id: '667atsas',
    name: 'Maiduguri',
  }, {
    id: 'hsyasajs',
    name: 'Anambra',
  }, {
    id: 'djsjudksjd',
    name: 'Benue',
  },{
    id: 'vuudydjsjd',
    name: 'Abu Dhabi',
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  },{
    id: 'vuudydjsjd',
    name: 'Abu Dhabi',
  }
  ,{
    id: 'vuudydjsjd',
    name: 'Abu Dhabi',
  }
];

const [category,setCategory]=useState<Array<RecipeDetailInterface>
>([])

useGetAll({
  key:"/portal/category/",
  onSuccess:(data) =>{
    setCategory(data)
  }
})



  const onSelectedItemsChange = (selectedItems:any[]) => {
    setSelectedItems(selectedItems);
  };

  const Assets: {[key:string]:ImageURISource}= {
    'clock':require('../assets/ClockIcon.png'),
    'serves':require('../assets/ServesIcon.png'),
    'category':require('../assets/CategoryStar.png')
}

    return (
    
    //<View style={{ flex: 1 }}>
    
        
    <View>
        <MultiSelect 
        styleDropdownMenu={styles.view} 
        styleDropdownMenuSubsection={{backgroundColor: 'rgba(216, 216, 216, 0.1)',height:400}}
        styleMainWrapper = {{maxHeight: 500,maxWidth:600}}
          // fixedHeight={false}
          hideTags={true}
          items={category}
          uniqueKey="id"
          // ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="Category"
          searchInputPlaceholderText="Search Items..."
          onChangeInput={ (text)=> console.log(text)}
          altFontFamily="ProximaNova-Light"
          tagRemoveIconColor="#CCC"
          tagBorderColor="#CCC"
          tagTextColor="#CCC"
          selectedItemTextColor="#CCC"
          selectedItemIconColor="#CCC"
          itemTextColor="#000"
          displayKey="name"
          hideSubmitButton={true}
          styleListContainer={stylelistCotainerProp}
          styleItemsContainer={stylelistItem}
          searchInputStyle={{ color: 'black' }}
          onToggleList={()=>( console.log('CLG Called'))}
          
        //   flatListProps={{onLayout}}
        //   submitButtonColor="#CCC"
        //   submitButtonText="Submit"
        ></MultiSelect>
      
       </View>
        
       
      
    );
  
}

const styles= StyleSheet.create({

  
   view:{
    height:60,
    width:280,
    borderRadius:20,
    // backgroundColor:'black'
    overflow:'scroll'
   },
   mainView:{
    flexDirection:'row',
    backgroundColor:'rgba(220, 220, 220, 0.9)',
    justifyContent:'space-between',
    width:'90%',
    height:60,
    alignSelf:'center',
    borderRadius:9,
    marginBottom:10,     
},
text:{
    fontWeight:'300',
    alignSelf:'center',
    // marginTop:3,
    paddingLeft:5
}
})

export default DropDownList;