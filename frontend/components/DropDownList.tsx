import React, { Component } from 'react';
import { View,StyleSheet ,Image,ImageURISource,Text} from 'react-native';
import MultiSelect from 'react-native-multiple-select';
import { useState } from 'react';

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
        
        <MultiSelect styleDropdownMenu={styles.view} styleDropdownMenuSubsection={{backgroundColor: 'lightgray'}}
          hideTags
          items={items}
          uniqueKey="id"
        //   ref={(component) => { this.multiSelect = component }}
          onSelectedItemsChange={onSelectedItemsChange}
          selectedItems={selectedItems}
          selectText=""
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
          searchInputStyle={{ color: '#CCC' }}
        //   flatListProps={{onLayout}}
        //   submitButtonColor="#CCC"
        //   submitButtonText="Submit"
        ></MultiSelect>
        // </View>
       
      
    );
  
}

const styles= StyleSheet.create({
   view:{
    height:60,
    marginRight:100,
    width:300,
    alignSelf:'center',
    borderRadius:20,
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