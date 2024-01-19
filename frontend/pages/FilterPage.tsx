import { View, Text, SafeAreaView, StyleSheet, Image, TouchableOpacity,ScrollView } from 'react-native'
import React, {useState} from 'react'
import CustomSearchBar from '../components/home/CustomSearch';
import FilterButton from '../components/home/FilterButton';
import BottomNavigationBar from '../components/BottomNavigationBar';
import { NavigationProp, ParamListBase } from '@react-navigation/native';
import RatingChip from '../components/RatingChip';
import LinearGradient from 'react-native-linear-gradient';
import BigButton from '../components/common/BigButton';
import CustomTabs from '../components/common/CustomTabs';
import CustomChips from '../components/common/CustomChips';
import StarCustomTab from '../components/common/StarCustomTab';

const FilterPage = ({navigation}:{navigation:NavigationProp<ParamListBase>}) => {

    const [searchText, setSearchText] = useState('');
    const [tabText, setTabText] = useState<string | undefined>(undefined)
    const [selected,setSelected] = useState<string | undefined>(undefined)
  
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
        <Text style ={styles.FilterText}>Filter Search</Text>
      </View>

      <Text style={styles.categoryText}>Time</Text>
      <View style={{flexDirection: 'row',maxWidth:'100%',paddingVertical:10,left:30}}>
      <CustomChips key={0} label={'All'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={1} label={'Newest'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={2} label={'Oldest'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={3} label={'Popularity'}  selected={selected} setSelected={setSelected}></CustomChips>
      </View>

      <View style={{top:15}}>
      <Text style={styles.categoryText}>Rate</Text>
      <TouchableOpacity style={{flexDirection: 'row',paddingVertical:10,left:30,marginTop:5}}>
      <StarCustomTab label={'5'}  width={50} height={32} margin={3} selected={tabText} setSelected={setTabText} image="star"></StarCustomTab>    
      <StarCustomTab label={'4'}  width={50} height={32} margin={3} selected={tabText} setSelected={setTabText} image="star"></StarCustomTab>    
      <StarCustomTab label={'3'}  width={50} height={32} margin={3} selected={tabText} setSelected={setTabText} image="star"></StarCustomTab>    
      <StarCustomTab label={'2'}  width={50} height={32} margin={3} selected={tabText} setSelected={setTabText} image="star"></StarCustomTab>    
      <StarCustomTab label={'1'}  width={50} height={32} margin={3} selected={tabText} setSelected={setTabText} image="star"></StarCustomTab>    
      
      
      </TouchableOpacity>
      </View>

      <View style={{top:25}}>
      <Text style={styles.categoryText}>Category</Text>
      <View style={{flexDirection: 'row',flexWrap:'wrap',maxWidth:'100%',paddingVertical:10,left:30}}>
        <CustomChips  key={0} label={'All'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={1} label={'Biryani Varities'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={2} label={'Vegetarian'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={3} label={'Kebabs'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={4} label={'Curries and Gravies'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={5} label={'Tandoori'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={6} label={'Snacks'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={7} label={'Drinks'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={8} label={'Healthy'}  selected={selected} setSelected={setSelected}></CustomChips>
        <CustomChips key={9} label={'Chutney'}  selected={selected} setSelected={setSelected}></CustomChips>
      </View>
      </View>

      <BigButton  btnLabel={'Filter'} btnWidth={200} btnPosition={'relative'} marginTop={120} Press={() => navigation.navigate('HomeScreen')} btnHeight={60} btnBorder={8}></BigButton>

    </SafeAreaView>

    
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,  },

  FilterText: {
    fontSize: 20,
    // lineHeight: 40,
    fontWeight: '500',
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
    paddingBottom: 10,
  },

 categoryText:{
    color:'rgba(0, 0, 0, 1)',
    fontSize:14,
    fontWeight:'400',
    left:30,
    
 },

})


export default FilterPage