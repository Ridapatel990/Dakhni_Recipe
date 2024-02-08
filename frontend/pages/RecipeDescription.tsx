import React, { useEffect, useState } from "react";
import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import BigCard from "../components/common/BigCard";
import StarCustomTab from "../components/common/StarCustomTab";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import CustomTabs from "../components/common/CustomTabs";
import IngredientsList from "../components/IngredientList";
import Procedure from "../components/Procedure";
import { useGetAll } from "../hooks";
import { ProcedureInterface, RecipeDetailInterface } from "../interfaces";
import StepsCard from "../components/StepsCard";

type RootStackParamList = {
  RecipeDescription: { id: string };
};

type DetailsScreenRouteProp = RouteProp<
  RootStackParamList,
  "RecipeDescription"
>;

const RecipeDescription = ({
  navigation,
  route,
}: {
  navigation: NavigationProp<ParamListBase>;
  route: DetailsScreenRouteProp;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tabText, setTabText] = useState<string | undefined>(undefined);
  const [chipText, setChipText] = useState<string | undefined>(undefined);
  const [selectedTab, setSelectedTab] = useState(0);
  const [longTabText, setLongTabText] = useState<string | undefined>(
    "Ingredients"
  );

  const { id: RecipeId } = route.params;
  const { data: recipeDetailsData } = useGetAll<RecipeDetailInterface>({
    key: `/recipes/${RecipeId}/`,
    select: (data: any) => data?.data,
  });

  // if (longTabText === "Ingredients") {
  //   list = (
  //     <IngredientsList data={recipeDetailsData?.ingredients}></IngredientsList>
  //   );
  // } else {
  //   list = recipeDetailsData?.procedures ? (
  //     recipeDetailsData?.procedures?.map((procedure: ProcedureInterface) => (
  //       <StepsCard
  //         txtLabel={`Step ${procedure?.order}`}
  //         description={procedure?.description}
  //       ></StepsCard>
  //     ))
  //   ) : (
  //     <Text></Text>
  //   );
  // }

  return (
    <ScrollView>
      <View
        style={{ flexDirection: "row", alignSelf: "center", marginBottom: 20 }}
      >
        <BigCard
          time={recipeDetailsData?.cooking_time}
          BigCardName={recipeDetailsData?.name || ""}
          BigCardWidth={360}
          Review="13k Reviews"
          recipeId={recipeDetailsData?.id || ""}
          imageUri={recipeDetailsData?.image1}
          // time="30 min"
          // BigCardName="Biryani"
          // BigCardWidth={360}
          // Review="13k Reviews"
          // recipeId=""
        ></BigCard>
      </View>

      <View
        style={{
          flexDirection: "row",
          width: 256,
          alignSelf: "center",
          justifyContent: "space-between",
        }}
      >
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <StarCustomTab
          tabBorderColor="gray"
          setBg={true}
          setColor={true}
          label={"Share"}
          width={"auto"}
          height={32}
          margin={3}
          selected={tabText}
          setSelected={setTabText}
          image="share"
          shareComponent="shareComponent"
        ></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column',width:'30%'}}> */}
        <StarCustomTab
          tabBorderColor="gray"
          setBg ={true}
          setColor={true}
          label={"Rate Recipe"}
          width={"auto"}
          height={32}
          margin={3}
          selected={tabText}
          setSelected={setTabText}
          image="rate"
          rateComponent="rateComponent"
        ></StarCustomTab>
        {/* </View> */}
        {/* <View style={{flexDirection:'column', width:'30%'}}> */}
        <TouchableOpacity>
          <StarCustomTab
            tabBorderColor="gray"
            label={"Reviews"}
            setBg={true}
            setColor={true}
            width={"auto"}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="review"
            Press={() => navigation.navigate("ReviewPage")}
          ></StarCustomTab>
        </TouchableOpacity>
        {/* </View> */}
      </View>

      <View
        style={{ marginTop: 30, flexDirection: "row", alignSelf: "center" }}
      >
        <CustomTabs
          defaultSelected={true}
          label={"Ingredients"}
          width={"40%"}
          height={42}
          margin={4}
          selected={longTabText}
          setSelected={setLongTabText}
        ></CustomTabs>

        <CustomTabs
          label={"Procedure"}
          width={"40%"}
          height={42}
          margin={4}
          selected={longTabText}
          setSelected={setLongTabText}
        ></CustomTabs>
      </View>

      {/* {list && <View> {list}</View>} */}
      <View>
        {longTabText === "Ingredients" ? (
          <IngredientsList
            data={recipeDetailsData?.ingredients}
          ></IngredientsList>
        ) : (
          ""
        )}
        {longTabText === "Procedure"
          ? recipeDetailsData?.procedures
            ? recipeDetailsData?.procedures?.map(
                (procedure: ProcedureInterface) => (
                  <StepsCard
                    txtLabel={`Step ${procedure?.order}`}
                    description={procedure?.description}
                  ></StepsCard>
                )
              )
            : ""
          : ""}
      </View>
    </ScrollView>
  );
};

export default RecipeDescription;
