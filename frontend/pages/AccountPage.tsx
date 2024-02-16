import { View, Text, Image, ScrollView, StyleSheet } from "react-native";
import React, { useEffect } from "react";
import { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import Profile from "../components/Profile";
import { NavigationProp, ParamListBase,RouteProp, useFocusEffect } from "@react-navigation/native";
import BigButton from "../components/common/BigButton";
import BigCard from "../components/common/BigCard";
import { useGetAll } from "../hooks";
import { GetProfileInterface, RecipeInterface } from "../interfaces";
import { mediaUrl } from "../utils/urls";

// const ScrollViewContent = () => (
//   <ScrollView horizontal={false}>
//     <View>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//       <BigCard
//         BigCardName="Biryani"
//         BigCardWidth={360}
//         Review="13k Reviews"
//       ></BigCard>
//     </View>
//   </ScrollView>
// );

interface ProfileProps {
  Name?: string;
  Label?: string;
  Description?: string;
}

const styles = StyleSheet.create({
  Name: {
    fontSize: 20,
    alignSelf: "center",
    marginTop: 10,
  },

  Label: {
    fontSize: 15,
    alignSelf: "center",
    marginTop: 10,
  },

  Description: {
    fontSize: 15,
    alignSelf: "center",
    marginTop: 10,
  },

  profileImage:{
    height:150,
    width:150,
    alignSelf:'center',
    borderRadius:90
}
});

// type RootStackParamList = {
//   AccountPage: { id: string };
// };

// type DetailsScreenRouteProp = RouteProp<
//   RootStackParamList,
//   "AccountPage"
// >;



const AccountPage = ({
  navigation,
  // route,

}: {
  navigation: NavigationProp<ParamListBase>;
  // route: DetailsScreenRouteProp;
}) => {
  const onItemTapped = (index: number) => {
    switch (index) {
      case 0:
        navigation.navigate("HomeScreen");
        break;
      case 1:
        navigation.navigate("SavedRecipePage");
        break;
      case 3:
        navigation.navigate("NotificationPage");
        break;
      case 4:
        navigation.navigate("AccountPage");
        break;

      default:
        break;
    }
  };

  const [profile, setProfile] = useState<GetProfileInterface | null>(null);
  

  // const data = await response.json();
  //     setUserData(data)

  // const handleEditProfile = () => {
  //   // Navigate to the edit profile page and pass default values as params
  //   navigation.navigate('EditProfile', { defaultValues: userData });
  // };
  // useEffect(() => {
    const { data: getProfile } = useGetAll({
      key: "/accounts/profile/",
      select: (data: any) => data?.data,
      onSuccess: (data) => {
        setProfile(data);
      },
    });
  // }, []);

  // const { id: RecipeId } = route.params;
  // const { data: recipeDetailsData, refetch: RefetchRecipeDetails } =
  //   useGetAll<RecipeDetailInterface>({
  //     key: `/recipes/${RecipeId}/`,
  //     select: (data: any) => data?.data,
  //   });

  // useFocusEffect(
  //   React.useCallback(() => {
  //     RefetchRecipeDetails();
  //   }, [])
  // );
  const { data: getRecipe } = useGetAll({
    key: "/recipes/list/?random=true",
    select: (data: any) => data?.data,
    onSuccess: (data) => {     
    },
  });
  // const getProfile = async()=>{

  // }

  // useEffect(()=>{}, [])
  
  return (
    <SafeAreaView style={{marginBottom:60}}>
      <View style={{ flexDirection: "column" }}>
        <View>
          <Profile navigation={navigation}></Profile>
        </View>
      </View>

      <View style={{ flexDirection: "column" }}>
        <View >
            <View style={{marginTop:0}}>
        <Image source={ profile?.profile_pic ? {uri: mediaUrl + profile?.profile_pic} : require('../assets/NoProfile.png')} style={styles.profileImage}></Image>
        </View>
        </View>
        <Text style={{ ...styles.Name }}>{profile?.name}</Text>
      </View>
      <ScrollView horizontal={false}>
        <View>
          <Text style={{ ...styles.Label }}>{profile?.profession}</Text>
          <Text style={{ ...styles.Description }}>{profile?.description} </Text>
        </View>

        <View style={{ margin: 20, padding: 20 }}>
          <BigButton
            btnLabel="Recipe"
            btnWidth={"100%"}
            btnHeight={50}
            btnBorder={10}
            btnPosition="relative"
          ></BigButton>
        </View>

        <View style={{ marginBottom: 260,paddingRight:20 }}>
          {profile?.recipes && profile?.recipes.length ? profile.recipes.map((recipe:RecipeInterface)=>(<BigCard
            key={recipe?.id}
            BigCardName={recipe.name}
            is_saved={recipe?.is_saved}
            BigCardWidth={'100%'}
            // Review={`${recipeDetailsData?.reviews} Reviews`}
            imageUri={recipe.image1 || null}
            recipeId={recipe.id}
            // imageUri={{uri: mediaUrl + recipe.image1} }
            Rating={String(recipe.rate)}
            time={recipe.cooking_time}
            Press={() => navigation.navigate("RecipeDescription",{
              id:recipe?.id
            })}
          ></BigCard>)): ''}
        </View>
      </ScrollView>

      {/* <View>
          <View>
            <Profile></Profile>
          </View>
          <View>
              <ProfileComponent></ProfileComponent>
            </View>
        </View> */}
    </SafeAreaView>
  );
};

export default AccountPage;