import { View, Text, TouchableOpacity, StyleSheet, DimensionValue, Image,SafeAreaView, ImageURISource,Modal, Button } from 'react-native'
// import React from 'react'
import React, { useEffect,useState } from 'react';
import BigButton from './BigButton';
import InputField from './InputField';
import { TextInput } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


interface CustomTabsProps {
    label: string;
    width: DimensionValue;
    height?: DimensionValue;
    margin?: DimensionValue;
    selected: string | undefined;   
    setSelected: React.Dispatch<React.SetStateAction<string | undefined>>;
    disabled?: boolean;
    defaultSelected?: boolean; 
    image?:string,
    tabBorderColor?: string,
    shareComponent?:string,
    rateComponent?:string
  }

const Assets: {[key:string]:ImageURISource}= {
    'star':require('../../assets/gradientstar.png'),
    'share':require('../../assets/ShareIcon.png'),
    'rate':require('../../assets/blackStar.png'),
    'review':require('../../assets/Review.png'),
}
const StarCustomTab : React.FC<CustomTabsProps> = ({label, width, height=30, margin, selected,setSelected, disabled = false, defaultSelected = false,image,tabBorderColor,shareComponent,rateComponent}) => {
    const chipColor = selected === label ? 'white' : disabled ? 'grey' : 'white';
  const labelColor = selected === label || disabled ? 'black' : 'black';
  console.log(image)

  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);

  }


  

  const imageComponents = Array.from({ length: 5 }, (_, index) => (
    <Image key={index} source={require('../../assets/whiteStar.png')}  />
  ));

  useEffect(() => {
    // Set the first tab as selected by default when the component mounts
    if (defaultSelected) {
      setSelected(label);
    }
  }, []);

    const styles = StyleSheet.create({
        tabs:{
            marginRight:4,
            zIndex:3, 
            bottom:5,
            flexDirection:'row',
            width:width,
            justifyContent:'space-evenly',
            borderRadius: 10,            
            borderWidth:1,
            height:height,
            // borderColor: '#FC1125',
            
        },
        labelText: {
            color: 'black',
            fontWeight: '300',
            fontSize: 11,
            alignSelf:'flex-end',
            margin:5
        }
    })

    const handlePress = () => {
      if (!disabled) {
        setSelected(label);
        toggleModal(); // Show the pop-up when the tab is pressed
      }
      // Logic
    }
  
  return (
    <View>
    <TouchableOpacity
      style={[
        styles.tabs,
        {
          backgroundColor: chipColor,
         
          borderColor:
            selected !== label
              ? tabBorderColor
                ? tabBorderColor
                : "red"
              : "white",
        },
      ]}
      onPress={handlePress}
      disabled={disabled}
    >


<View style={{overflow: "hidden",borderRadius: 10, zIndex:10}}>
       
        
       <Text style={[styles.labelText, {color: labelColor}]}>{label}</Text></View>
       <View style={{alignSelf:'flex-start',marginTop:5}}>
       {image && <Image source={Assets[image]} ></Image>}</View>



    </TouchableOpacity>

    {/* Modal for the pop-up */}
    {shareComponent &&
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal} presentationStyle='overFullScreen'>
    
    <View style={{flexDirection:'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      
        <View style={{backgroundColor:'white',width:'90%',height:'30%',borderRadius:10,flexDirection:'column'}}>
          <View style={{flexDirection:'row',justifyContent:'space-between',height:50,width:310,marginLeft:5,marginTop:15}}>
            <Text style={{alignSelf:'flex-start',fontSize:20,color:'black',fontWeight:'400',marginLeft:15}}>Recipe Link</Text>
            <TouchableOpacity onPress={toggleModal}>
            <Image style={{alignSelf:'flex-start',marginBottom:5,height:20,width:20}} source={require('../../assets/Close.png')}></Image>
            </TouchableOpacity>
          </View>
          <View style={{flexDirection:'row',marginLeft:20,width:'90%'}}>
            <Text style={{fontSize:14}}>Copy Recipe Link and Share with your Family and Friends</Text>
          </View>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',width:'80%',height:105}}>
            <View style={{alignSelf:'flex-start',marginRight:5,width:240}}>
            <InputField></InputField>
            </View>
            <View style={{alignSelf:'flex-end',marginRight:10}}>
            <BigButton btnLabel='Copy' btnHeight={50} btnWidth={90} btnBorder={10}></BigButton>
            </View>
          </View>

        </View>
      </View>
      
    </Modal>}

    {/* Rate Component */}

    {rateComponent &&
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={toggleModal} presentationStyle='overFullScreen'>
    
    <View style={{flexDirection:'column', flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      
        <View style={{backgroundColor:'white',width:'90%',height:'30%',borderRadius:10,flexDirection:'column',alignSelf:'center'}}>
        <TouchableOpacity onPress={toggleModal}>
            <Image style={{alignSelf:'flex-end',margin:5,height:20,width:20}} source={require('../../assets/Close.png')}></Image>
            </TouchableOpacity>
          <View style={{alignSelf:'center',margin:30}}><Text style={{fontSize:25}}>Rate Recipe</Text></View>
          
          <View style={{flexDirection:'row',justifyContent:'space-between',width:120,alignSelf:'center'}}>
      {imageComponents}
    </View>

    <View style={{flexDirection:'column'}}>
          <TouchableOpacity style={{width:70,height:50,marginTop:30,alignSelf:'center'}}>
          <LinearGradient colors={['#FC1125', '#FF9300']} start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} style={{borderRadius:10}}>
            <View>
              <Text style={{fontSize:20,margin:4,color:'white',alignSelf:'center'}}>Send</Text>
            </View>
          </LinearGradient>
          </TouchableOpacity>
        </View>

        </View>
        
        

      </View>
      
    </Modal>}

  </View>
  
  )

}

export default StarCustomTab;