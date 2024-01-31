import React,{useState} from "react";
import { View ,Text, StyleSheet,Image, TouchableOpacity} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/common/InputField";
import BigButton from "../components/common/BigButton";
import CircularAvatar from "../components/CircleAvatar";
import ProfileComponent from "../components/home/ProfileComponent";
import ReviewComponent from "../components/ReviewComponent";
import { useGetAll } from "../hooks";
import { GetProfileInterface } from "../interfaces";

   
interface ReviewPageProps{
    Reviews?:string
}

const ReviewPage: React.FC<ReviewPageProps> = ({Reviews='0 Reviews'}) =>{

    const [review,setReview]= useState([]);

    const {data:getReview}=useGetAll({
        key:'/recipes/list/?random=true',
        onSuccess:(data)=> {
            console.log(data,"<=========ngredient datat")
            setReview(data)
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
        <View style={{flexDirection:'column',justifyContent:'center'}}>

        <View style={{flexDirection:'row',marginLeft:15,marginTop:15}}>
            <TouchableOpacity>
            <Image source={require('../assets/backArrow.png')} style={{marginRight:60,marginTop:5}}></Image>
            </TouchableOpacity>
                <Text style={{fontWeight:'400',fontSize:20,color:'black',marginLeft:60,textAlign:'center'}}>Reviews</Text>
            </View>


            <View style={{marginLeft:19,marginTop:14}}>
                <Text style={{fontWeight:'300'}}>{Reviews}</Text>
            </View>

        <View style={{flexDirection:'column',justifyContent:'space-between',marginTop:2}}>
        <View>
            <InputField textforInput="Leave a Comment"></InputField>
        </View>
        
        
        </View>
        <View style={{flexDirection:'column',alignSelf:'flex-end',marginRight:75,marginTop:80}}>
        <BigButton btnHeight={50} btnWidth={90} btnBorder={10} btnLabel="Save"></BigButton>
        </View>
        </View>   
        
        <View style={{flexDirection:'column'}}>
        <View style={{marginTop:30}}>
        <ReviewComponent name={profile?.name} time="Jun 12 2020,12:42" review="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quod?"></ReviewComponent>
        </View>

        <View style={{marginTop:30}}>
        <ReviewComponent name="Elena" time="Jun 12 2020,12:42" review="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quod?"></ReviewComponent>
        </View>
        
        </View>
        
        
     </SafeAreaView>
    )

    
}

const styles = StyleSheet.create({
        mainText:{
            fontSize:20,
            fontWeight:'500',
            marginLeft:20,
            marginTop:10,
        }
    })

export default ReviewPage;