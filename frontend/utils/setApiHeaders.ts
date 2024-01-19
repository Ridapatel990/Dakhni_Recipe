import { serverAPI } from ".";
import AsyncStorage from '@react-native-async-storage/async-storage';


const getToken = async()=>{
  const token = await AsyncStorage.getItem('userToken');
  return token;
}

export const setApiHeaders =async () => {
  let token:string | null = await getToken();
  // console.log('token inside setApiHeaders', token)
  if (token) {
    serverAPI.defaults.headers.common["x-access-token"] = token;
  } else {
    delete serverAPI.defaults.headers.common["x-access-token"];
  }
};
