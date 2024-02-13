import { View, Text, StyleSheet, TouchableOpacity, ToastAndroid, ScrollView } from 'react-native'
import React, { useEffect } from 'react';
import { useState } from 'react';
import * as ImagePicker from "react-native-image-picker";
import CircularAvatar from '../components/CircleAvatar'
import { Image } from 'react-native'
import { InputAccessoryView } from 'react-native'
import InputField from '../components/common/InputField'
import BigButton from '../components/common/BigButton'
import { useCreateOrUpdate } from '../hooks';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useForm,Controller } from 'react-hook-form';
import { NavigationProp,ParamListBase } from '@react-navigation/native';
import { UserInterface } from '../interfaces';
import { mediaUrl } from '../utils/urls';



const EditProfilePage = ({navigation }:{navigation: NavigationProp<ParamListBase>;}) => {
  const {
    control,
    formState: { errors },
    getValues,
  } = useForm({});
  const [image, setImage] = useState<ImagePicker.Asset | undefined>(undefined);
  const [userId ,setUserId] = useState<UserInterface>();
  const [user,setUser] = useState<{name:string;email:string,profession:string,description:string;profile_pic:string} |null>(null)
  
  


  //   interface OptionsCommon {
  //     mediaType: ImagePicker.MediaType;
  // }
  //   const imageOptions:OptionsCommon ={

  //   }

  // const [profile, setProfile] = useState<GetProfileInterface | null>(null);

  // const { data: getProfile } = useGetAll({
  //   key: "/accounts/profile/",
  //   select: (data: any) => data?.data,
  //   onSuccess: (data) => {

  //     setProfile(data);
  //   },
  // });
  
  useEffect(() => {
    getUserId()
  }, []);
  
  const onSubmit = () =>{
    console.log('Submit Called')
    const data= getValues();
    const formData = new FormData();

    // console.log(image,data,"<========dATATTAATATA===>",user,"<===========IAMGEEEEEEE");


    if(image?.uri) {
      formData.append('profile_pic', {
        uri: image?.uri,
        type: image?.type,
        name: image?.fileName,
      });
    }
      
      formData.append('name', data.name || user?.name);
      formData.append('email',data.email || user?.email );
      formData.append('profession', data.profession || user?.profession);
      formData.append('description', data.description || user?.description);
    
    // console.log("Data",formData)
    mutate(formData)
  }
  
  
  const selectImage = async () => {
    let result = await ImagePicker.launchImageLibrary({
      mediaType: 'photo'
      // mediaTypes: ImagePicker.MediaTypeOptions.Images,
      // allowsEditing: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    if (!result.didCancel && result?.assets) {
    // console.log(result?.assets[0],"<===========RESult")
      setImage(result?.assets[0]);
    }
  };
  const getUserId = async()=>{
    const UserId = await AsyncStorage.getItem('user');
    const userObj = JSON.parse(UserId || '') 
    setUserId(userObj.id)
    setUser(userObj)
    // return userObj.id;
  }



  const { mutate } = useCreateOrUpdate({
    url: `/accounts/user/${userId}/`,
    method :'put',
    headers:{'Content-Type': 'multipart/form-data' },
    onSuccess:  (response) => {
      navigation.navigate("AccountPage")
      console.log('Success',response)
      // ToastAndroid.show("Login Successfully", ToastAndroid.SHORT);
    },
    onError : (error) => {
      console.log(error.status)
    }
  });



  const styles = StyleSheet.create({
    edit: {
      fontSize: 23,
      alignSelf: 'flex-start',
      width: 150,
      color: 'black',
      margin: 10,
      fontWeight: '400'
    },
    profile: {
      backgroundColor: 'rgba(238, 238, 238, 1)',
      borderRadius: 100,
      height: 200,
      width: 200,
      alignSelf: 'center',
      flexDirection: 'row'
    },
    input: {
      width: '100%',
      alignSelf: 'center',
    }

  })
  return (
    <View>
<ScrollView>
      <View style={{ margin: 20 }}>
        <Text style={styles.edit}>Edit Profile</Text>
      </View>

      <View style={{ alignSelf: 'center', width: 200, marginBottom: 20 }}>
        <View style={styles.profile}>
          <TouchableOpacity style={{ alignSelf: 'flex-end', width: 200 }} onPress={selectImage}>
          <Image source={{ uri: !image?.uri ?  (mediaUrl + user?.profile_pic) :image?.uri} } style={{ objectFit: "cover", alignSelf: 'center', width: '100%', height: '100%', borderRadius: 100 }} />

            {/* {image ? (
              <Image source={{ uri:mediaUrl + profile?.profile_pic }} style={{ objectFit: "cover", alignSelf: 'center', width: '100%', height: '100%', borderRadius: 100 }} />
            ) : (
              <Image source={{ uri:mediaUrl + profile?.profile_pic }} style={{ objectFit: "cover", alignSelf: 'center', width: '100%', height: '100%', borderRadius: 100 }} />
            )} */}
          </TouchableOpacity></View>
      </View>

      <View style={styles.input}>
      <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              // value={user?.name}
              defaultValue={user?.name}
              textforInput={"Name"}
              placeholder={"Enter Name"}
            />
          )}
          name="name"
          rules={{ required: "Name is required" }}
        />


<Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              defaultValue={user?.profession}
              textforInput={"Profession"}
            />
          )}
          name="profession"
          // rules={{ required: "Name is required" }}
        />

<Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <InputField
              onBlur={onBlur}
              onChangeText={onChange}
              defaultValue={user?.description}
              textforInput={"Description"}
              // placeholder={"Enter Name"}
            />
          )}
          name="description"
          rules={{ required: "Name is required" }}
        />
      </View>

      <View style={{ marginTop: 50 }}>
        <BigButton 
        btnLabel='Save' 
        btnHeight={70} 
        btnWidth={100} 
        btnPosition='relative' 
        btnBorder={10}
        Press={onSubmit}
        >  
        </BigButton>
      </View>
      </ScrollView>
    </View>
  )
}



export default EditProfilePage