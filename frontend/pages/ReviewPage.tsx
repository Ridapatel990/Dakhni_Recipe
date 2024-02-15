import React, { useState } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import InputField from "../components/common/InputField";
import BigButton from "../components/common/BigButton";
import ReviewComponent from "../components/ReviewComponent";
import { useCreateOrUpdate, useGetAll } from "../hooks";
import { GetProfileInterface, ReviewInterfce } from "../interfaces";
import {
  NavigationProp,
  ParamListBase,
  RouteProp,
} from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import moment from "moment";

type RootStackParamList = {
  ReviewPage: { id: string };
};

type ReviewScreenRouteProp = RouteProp<RootStackParamList, "ReviewPage">;

interface ReviewPageProps {
  navigation: NavigationProp<ParamListBase>;
  route: ReviewScreenRouteProp;
}

const ReviewPage: React.FC<ReviewPageProps> = ({ navigation, route }) => {
  const { id: RecipeId } = route.params;
  const { control, getValues, reset } = useForm();

  const { data: ReviewsData, refetch } = useGetAll({
    key: `/social/review-recipe/list/?recipe=${RecipeId}`,
    select: (data: any) => data?.data,
  });

  const { mutate } = useCreateOrUpdate({
    url: "/social/review-recipe/create/",
    onSuccess() {
      reset();
      refetch();
    },
    onError(data) {
      console.log("Request Failed", data);
    },
  });

  return (
    <SafeAreaView>
      <View style={{ flexDirection: "column", justifyContent: "center" }}>
        <View style={{ flexDirection: "row", marginLeft: 15, marginTop: 15 }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require("../assets/backArrow.png")}
              style={{ marginRight: 60, marginTop: 5 }}
            ></Image>
          </TouchableOpacity>
          <Text
            style={{
              fontWeight: "400",
              fontSize: 20,
              color: "black",
              marginLeft: 60,
              textAlign: "center",
            }}
          >
            Reviews
          </Text>
        </View>

        <View style={{ marginLeft: 19, marginTop: 14 }}>
          {/* <Text style={{ fontWeight: "300" }}>{Reviews}</Text> */}
        </View>

        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            marginTop: 2,
          }}
        >
          <View>
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <InputField
                  onBlur={onBlur}
                  textforInput={"Leave a Comment"}
                  placeholder={"Enter Comment..."}
                  value={value}
                  onChangeText={onChange}
                />
              )}
              name="comment"
              rules={{ required: "Comment is required" }}
            />
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignSelf: "flex-end",
            marginRight: 75,
            marginTop: 80,
          }}
        >
          <BigButton
            btnHeight={50}
            btnWidth={90}
            btnBorder={10}
            btnLabel="Save"
            Press={() => mutate({ ...getValues(), recipe: RecipeId })}
          ></BigButton>
        </View>
      </View>

      <View style={{ flexDirection: "column" }}>
        {ReviewsData?.rows && ReviewsData?.rows?.length > 0
          ? ReviewsData?.rows?.map((review: ReviewInterfce) => {
              return (
                <View style={{ marginTop: 30, marginLeft: 15 }}>
                  <ReviewComponent
                    key={review?.id}
                    name={review?.user?.name}
                    // time="Jun 12 2020,12:42"
                    time={moment(review?.created_on)?.format(
                      "MMM DD YYYY, HH:mm"
                    )}
                    review={review?.comment}
                    profile_pic={review?.user?.profile_pic}
                  ></ReviewComponent>
                </View>
              );
            })
          : ""}
        {/* 
        <View style={{ marginTop: 30 }}>
          <ReviewComponent
            name="Elena"
            time="Jun 12 2020,12:42"
            review="Lorem ipsum dolor sit amet consectetur adipisicing elit. In, quod?"
          ></ReviewComponent>
        </View> */}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  mainText: {
    fontSize: 20,
    fontWeight: "500",
    marginLeft: 20,
    marginTop: 10,
  },
});

export default ReviewPage;
