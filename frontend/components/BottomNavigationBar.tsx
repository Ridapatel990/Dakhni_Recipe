import React, { useEffect } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Gradient from './Gradient'
import LinearGradient from 'react-native-linear-gradient';


interface BottomBarProps {
    onItemTapped: (index: number) => void;
    selectedIndex: number;
    // selected: string | undefined;   
    // setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabled?: boolean;
    defaultSelected?: boolean; 
    
  }

const BottomNavigationBar: React.FC<BottomBarProps> = ({ onItemTapped, selectedIndex, disabled = false, defaultSelected = false,  }) => {
  const listofIcon = [
   'home',
    'bookmark-outline',
    'empty_space',
    'notifications-outline',
    'person',
  ];

  // useEffect(() => {
  //   // Set the first tab as selected by default when the component mounts
  //   if (defaultSelected) {
  //       setSelected(selectedIndex);
  //   }
  // }, [])

  // useEffect(() => {
  //   // Set the first tab as selected by default when the component mounts
  //   if (defaultSelected) {
  //       setSelected(selectedIndex);
  //   }
  // }, [])

  const styles=StyleSheet.create({
    navBar:{ 
     height: 'auto',
     backgroundColor: 'white',
     shadowColor: 'black',
     shadowOpacity: 0.1,
     shadowRadius: 24,
     elevation: 5,
     position: 'absolute',
     bottom:0,
     left:0,
     width:'100%',
   },

   addButton:{
  position: 'absolute', 
  backgroundColor: 'white',
  width: 70,
  height: 80, 
  borderRadius: 35, 
  bottom: 33, 
  marginLeft:15,
  zIndex: 10,
  left:'50%',
  transform: [{ translateX:-25 }] ,
  alignItems:'center',
  justifyContent:'center',
  borderColor:'white',
  borderWidth:5,      
  shadowColor: 'black',
  shadowOpacity: 0.1,        
  shadowRadius: 24
    
  },

  addIcon:{ 
    backgroundColor:'white',
    padding:20,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',position:'relative'
  }


   })


  return (
   
     <View style={styles.navBar}>
        <View style={styles.addIcon}>
           
           
           <TouchableOpacity style={styles.addButton} >
           <LinearGradient colors={['rgba(252, 17, 37, 1)', 'rgba(255, 147, 0, 1)']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{borderRadius:50,height:60,width:60,marginBottom:7}}>
           <Icon style={{alignSelf:'center', top:7}}
            name={'add-outline'}
            size={40}
           color={'white'}
          />
          </LinearGradient>
          </TouchableOpacity>    
      {listofIcon.map((icon, index) => {
    return icon === 'empty_space' ? (<View key={index}></View>) : (
        <TouchableOpacity
        key={index}
        onPress={() => onItemTapped(index)}
        style={{
          alignItems: 'center',
        }}>
            <Icon
            name={icon}
            size={30}
            color={selectedIndex === index ? '#FC1125' : '#D9D9D9'}
            />
        </TouchableOpacity>)
          }
      )}
      
        </View>
    </View>
  );
};

export default BottomNavigationBar;
