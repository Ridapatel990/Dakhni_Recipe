import React,{useState} from "react";
import { View,Image, DimensionValue,Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import CircularAvatar from "./CircleAvatar";
import { useGetAll } from "../hooks";
import { GetProfileInterface } from "../interfaces";

interface ReviewComponentProps{
    name?:string,
    font?:DimensionValue,
    time?:string,
    review?:string
}

const ReviewComponent:React.FC<ReviewComponentProps> = ({name,font=20,time,review}) => {

    const [reviews,setReviews]= useState([]);

    const {data:getReview}=useGetAll({
        key:'/recipes/list/?random=true',
        onSuccess:(data)=> {
            console.log(data,"<=========ngredient datat")
            setReviews(data)
            }
    })

    const [profile, setProfile] = useState<GetProfileInterface | null>(null);

  const { data: getProfile } = useGetAll({
    key: "/accounts/profile/",
    select: (data: any) => data?.data,
    onSuccess: (data) => {

      setProfile(data);
    },
  });

    return(
        <SafeAreaView>
        <View style={{flexDirection:'row',alignSelf:'flex-start',marginLeft:20}}>
        <CircularAvatar height={40} width={40} image="photo"></CircularAvatar>
        <View style={{flexDirection:'column',marginLeft:10,justifyContent:'space-between'}}>
            <Text style={{fontSize:15,color:'black',fontWeight:'300'}}>{profile?.name}</Text>
            <Text style={{fontSize:10,fontWeight:'200'}}>{time}</Text>
        </View>
        </View>
        <View style={{width:'90%',alignSelf:'center',marginTop:5}}>
        <Text>{review}</Text>
        </View> 

        </SafeAreaView>
    )
}
export default ReviewComponent