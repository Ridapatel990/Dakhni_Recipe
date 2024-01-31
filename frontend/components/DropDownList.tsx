import React, { Component } from 'react';
import { View,StyleSheet ,Image,ImageURISource,Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useState } from 'react';

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

}

const stylelistCotainerProp:FlexStyle ={
  alignContent:'flex-end',
  maxWidth:'100%'
  
}
const  DropDownList  =()=> {


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
  }, {
    id: 'sdhyaysdj',
    name: 'Kaduna',
  }, {
    id: 'suudydjsjd',
    name: 'Abuja',
  }];

  const onSelectedItemsChange = (selectedItems:any[]) => {
    setSelectedItems(selectedItems);
  };

  const Assets: {[key:string]:ImageURISource}= {
    'clock':require('../assets/ClockIcon.png'),
    'serves':require('../assets/ServesIcon.png'),
    'category':require('../assets/CategoryStar.png')
}

    return (
    //   <View style={{ flex: 1 }}>
        <View>
          
        <MultiSelect styleDropdownMenu={styles.view} styleDropdownMenuSubsection={{backgroundColor: 'rgba(217, 217, 217, 0.58)'}}
          hideTags={true}
          items={items}
          uniqueKey="id"
          // ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText="category"
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
          styleListContainer={stylelistCotainerProp}
          searchInputStyle={{ color: '#CCC' }}
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
    width:'100%',
    alignSelf:'center',
    borderRadius:20,
    marginRight:50
    // backgroundColor:'lightgray'
   },
   mainView:{
    flexDirection:'row',
    backgroundColor:'rgba(220, 220, 220, 0.4)',
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