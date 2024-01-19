import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomSearchBar from '../components/home/CustomSearch'
import FilterButton from '../components/home/FilterButton';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import Card from '../components/home/Card';

const SearchRecipes = ({navigation}:{navigation:NavigationProp<ParamListBase>}) => {

  const [searchText, setSearchText] = useState('');

  const handleSearch = (text: string) => {
    //logic
    setSearchText(text);
  
  }
    const onItemTapped = (index: number) => {
      switch (index) {
        case 1: 
        navigation.navigate('HomeScreen');
        break;
        
        default:
         
          break;
      }
  };


  return (
    <SafeAreaView style={{height:'100%'}}>
      <View>
        <Text style ={styles.SearchText}>Search Recipes</Text>
      </View>

      <View style = {{marginLeft: 20, flexDirection: 'row', position: 'relative' }}>
        <CustomSearchBar value={searchText} placeholder={'Search'} onChangeText={() => handleSearch} barWidth={'70%'}></CustomSearchBar>

        <FilterButton btnWidth={40}></FilterButton>



      </View>
      
       
      <ScrollView  horizontal={false} style={{flexDirection: 'column',maxWidth:'100%',paddingVertical:10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between',flexWrap:'wrap', marginRight: 20,marginLeft:20, marginTop: 20,marginBottom:110}}>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          <Card CardName='Chicken'></Card>
          </View>
          </ScrollView >  

          <BottomNavigationBar onItemTapped={() => onItemTapped} selectedIndex={0} />
        
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  },

  SearchText: {
    fontSize: 20,
    // lineHeight: 40,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    paddingLeft: 20,
    paddingBottom: 10,
    marginLeft: 10,

  },

  welcomeText: {
    fontSize: 14,
    fontWeight: '400',
    color: 'black',
    marginLeft: 10,
    paddingLeft: 20
    
  },

  

  // squareImage: {
  //   // flexDirection: 'row',
  //   marginTop: 30,
  //   height: 40,
    
  // },

  // overLayImg: {
  //   // flexDirection: 'row',
  //   marginTop: 30,
  //   height: 40,
  //   // position: 'absolute',
  //   // top: 50,
  //   // left: 50,
    
  // }
})


export default SearchRecipes