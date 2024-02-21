// import { View, Text, StyleSheet,Image, TouchableOpacity ,TextInput} from 'react-native'
// import React from 'react'
// import { useState } from 'react';

// interface StepsCardProps {
//     txtLabel: string;
//     description: string;
//     time? : string;
//     Press?: () => void;
//   }
  

// const StepsCard: React.FC<StepsCardProps>  = ({txtLabel, description, time}) => {

//     const [isVisible, setIsVisible] = useState(true);
//     const [editMode, setEditMode] = useState(false);
//     const [textValue, setTextValue] = useState('Initial Value');
//     const [showComponent, setShowComponent] = useState(false);

//   const handleAddComponent = () => {
//     setShowComponent(true);
//   };

//   const handlePress = () => {
//     setIsVisible(false);
//   };

//   const handleToggleEditMode = () => {
//     setEditMode(!editMode);
// };

// const handleTextChange = (text:string) => {
//   setTextValue(text);
// };

//   return (
//     <View style={styles.slide}>
//      { isVisible && (
//     <View style={{alignSelf:'center',marginTop:10,paddingLeft:10}}><Image source={require('../assets/drag_handle.png')}></Image></View>)}  

//     { isVisible && ( 
//     <View style={styles.cardContainer}>
        
     
//         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
           
//         <Text style={styles.stepText}>{txtLabel}</Text>
        
//         <View style={{flexDirection:'row',alignSelf:'flex-end',marginRight:5,marginBottom:15}}>
//         { editMode ? (

//         <TouchableOpacity onPress={handleToggleEditMode} ><Image source={require('../assets/Tick.png')} style={{marginRight:10,height:16,width:16}}></Image></TouchableOpacity>
//         // <TextInput
//         //   style={{ borderBottomWidth: 1, padding: 5 }}
//         //   value={textValue}
//         //   onChangeText={handleTextChange}
//         //   onBlur={handleToggleEditMode} // Toggle edit mode off on blur
//         //   autoFocus // Automatically focus input field on edit mode
//         // />
//       ) : (
//         <TouchableOpacity onPress={handleToggleEditMode}>
//             <Image source={require('../assets/PencilLine.png')} style={{marginRight:10}}></Image>
//             </TouchableOpacity>

//       )}
            

            
//             <TouchableOpacity onPress={handlePress}>
//             <Image source={require('../assets/Delete.png')} style={{marginRight:5}}></Image>
//             </TouchableOpacity>
            
//         </View>
//         </View>
    
//      <View>
//         <TextInput multiline={true} numberOfLines={3} editable={editMode} style={styles.description}>
//             {description}
//         </TextInput>
        
//      </View>
//      </View>)}
     
     
    
//     </View>
//   )
// }

// const styles = StyleSheet.create({

//     slide:{
//         flexDirection:'row', 
//         justifyContent:'space-between',
//     },

//     cardContainer:{
//         marginTop: 20,
//         paddingBottom: 10,
//         height: 'auto',
//         width: 310,
//         backgroundColor: '#D9D9D9',
//         borderRadius: 12,
//         marginRight:20,
//     },
//     stepText: {
//         padding: 10,
//         color:'black',
//         fontWeight:'400'

//     },
//     description:{
//         paddingLeft: 10,
//         color: '#A9A9A9',
//         fontSize:16,
//         paddingBottom:10

//     },
    
// })

// export default StepsCard


import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput } from 'react-native'
import React, { useState } from 'react';

interface StepsCardProps {
  txtLabel: string;
  description: string;
  time?: string;
  Press?: () => void;
  onDelete: () => void;
}

const StepsCard: React.FC<StepsCardProps> = ({ txtLabel, description, time, onDelete }) => {
  const [isVisible, setIsVisible] = useState(true);
  const [editMode, setEditMode] = useState(false);
  const [textValue, setTextValue] = useState(description);

  const handleToggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleTextChange = (text: string) => {
    setTextValue(text);
  };

  const handleDelete = () => {
    setIsVisible(false);
    onDelete();
  };

  return (
    <>
      {isVisible && (
        <View style={styles.cardContainer}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={styles.stepText}>{txtLabel}</Text>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              {editMode ? (
                <TouchableOpacity onPress={handleToggleEditMode}>
                  <Image source={require('../assets/Tick.png')} style={{ marginRight: 10, height: 16, width: 16 }} />
                </TouchableOpacity>
              ) : (
                <TouchableOpacity onPress={handleToggleEditMode}>
                  <Image source={require('../assets/PencilLine.png')} style={{ marginRight: 10 }} />
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleDelete}>
                <Image source={require('../assets/Delete.png')} style={{ marginRight: 5 }} />
              </TouchableOpacity>
            </View>
          </View>
          <View>
            {editMode ? (
              <TextInput
                multiline={true}
                numberOfLines={3}
                value={textValue}
                onChangeText={handleTextChange}
                style={styles.description}
              />
            ) : (
              <Text style={styles.description}>{description}</Text>
            )}
          </View>
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginTop: 20,
    paddingBottom: 10,
    width: 310,
    backgroundColor: '#D9D9D9',
    borderRadius: 12,
    marginRight: 20,
  },
  stepText: {
    padding: 10,
    color: 'black',
    fontWeight: '400',
  },
  description: {
    paddingLeft: 10,
    color: '#A9A9A9',
    fontSize: 16,
    paddingBottom: 10,
  },
});

export default StepsCard;
