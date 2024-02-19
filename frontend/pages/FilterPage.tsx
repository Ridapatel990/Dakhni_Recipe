import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import CustomSearchBar from "../components/home/CustomSearch";
import FilterButton from "../components/home/FilterButton";
import BottomNavigationBar from "../components/BottomNavigationBar";
import { NavigationProp, ParamListBase } from "@react-navigation/native";
import RatingChip from "../components/RatingChip";
import LinearGradient from "react-native-linear-gradient";
import BigButton from "../components/common/BigButton";
import CustomTabs from "../components/common/CustomTabs";
import CustomChips from "../components/common/CustomChips";
import StarCustomTab from "../components/common/StarCustomTab";
import { useForm, Controller } from "react-hook-form";
import { useCreateOrUpdate, useGetAll } from "../hooks";
import { CategoryInterface, FilterDataInterface } from "../interfaces";
import MultiselectChip from "../components/MultiselectChip"

const initialFilterData: FilterDataInterface = {
  categories: [],
  time: null,
  rate: null,
};

const FilterPage = ({
  navigation,
}: {
  navigation: NavigationProp<ParamListBase>;
}) => {
  const [searchText, setSearchText] = useState("");
  const [tabText, setTabText] = useState<string | undefined>(undefined);
  const [selected, setSelected] = useState<string | undefined>(undefined);
  const [tabSelected,setTabSelected] = useState<{id:string;name:string}[]>([]);
  // const [selectedCategory, setSelectedCategory] = useState<Array<string>>([]);
  const [filterData, setFilterData] =
    useState<FilterDataInterface>(initialFilterData);

  const {
    control,
    formState: { errors },
    getValues,
  } = useForm();

  const onItemTapped = (index: number) => {
    switch (index) {
      case 1:
        navigation.navigate("HomeScreen");
        break;

      default:
        break;
    }
  };

  const { mutate } = useCreateOrUpdate({
    url: "/recipes/filter-recipes/",
    onSuccess: async (response) => {
      // console.log(response.data);
      navigation.navigate("FilterResponse", { rows: response.data?.rows });
    },
  });

  const { data: allCategories } = useGetAll({
    key: "/portal/category/",
    enabled: true,
  });

  const onFilter = async () => {
    // const data = getValues();
    let catIds = tabSelected?.map(item => item?.id)
    console.log(catIds,'<=======filterDATATAT');
    mutate({...filterData,rate:tabText,categories:catIds});
  };

  return (
    <SafeAreaView style={{ height: "100%" }}>
      <View>
        <Text style={styles.FilterText}>Filter Search</Text>
      </View>

      <Text style={styles.categoryText}>Time</Text>
      <View
        style={{
          flexDirection: "row",
          maxWidth: "100%",
          paddingVertical: 10,
          left: 30,
        }}
      >
        {["All", "Newest", "Oldest", "Popularity"].map((item: string) => (
          <Controller
            control={control}
            name="time"
            render={({ field: { onChange, onBlur, value } }) => (
              <CustomChips
                key={item}
                label={item}
                selected={selected}
                setSelected={setSelected}
                onPress={() => {
                  setFilterData((prev) => ({
                    ...prev,
                    time: item.toLocaleLowerCase(),
                    // time:
                    //   filterData.time == item.toLocaleLowerCase()
                    //     ? null
                    //     : item.toLocaleLowerCase(),
                  }));
                }}
              />
            )}
          />
        ))}
      </View>

      <View
        style={{
          top: 15,
          flexDirection: "column",
          flexWrap: "wrap",
          alignSelf: "center",
          width: "85%",
        }}
      >
        <Text style={styles.categoryText}>Rate</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingVertical: 10,
            marginTop: 5,
          }}
        >
          <StarCustomTab
            label={"5"}
            width={50}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="star"
            activeImage="white-star"
          ></StarCustomTab>
          <StarCustomTab
            label={"4"}
            width={50}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="star"
            activeImage="white-star"
          ></StarCustomTab>
          <StarCustomTab
            label={"3"}
            width={50}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="star"
            activeImage="white-star"
          ></StarCustomTab>
          <StarCustomTab
            label={"2"}
            width={50}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="star"
            activeImage="white-star"
          ></StarCustomTab>
          <StarCustomTab
            label={"1"}
            width={50}
            height={32}
            margin={3}
            selected={tabText}
            setSelected={setTabText}
            image="star"
            activeImage="white-star"
          ></StarCustomTab>
        </TouchableOpacity>
      </View>

      <View style={{ top: 25 }}>
        <Text style={styles.categoryText}>Category</Text>
        <View
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            maxWidth: "100%",
            paddingVertical: 10,
            left: 30,
          }}
        >
          {allCategories && allCategories.length
  ? allCategories.map((cat: CategoryInterface) => (
      <MultiselectChip
        key={cat.id}
        // label1={cat.name}
        data={cat}
        tabSelected={
          tabSelected
          // filterData.categories.includes(cat.id)
          //   ? [cat.name]
          //   : [cat.name + "dummy"]
        }
        setTabSelected={setTabSelected}
        defaultSelected={false}
        onPress={() => {
          console.log('on Presssss')
          if (!filterData.categories.includes(cat.id)) {
            setFilterData((prev) => ({
              ...prev,
              categories: [...prev.categories, cat.id],
            }));
          } else {
            let cats = filterData.categories;
            const index = cats.indexOf(cat.id);
            cats.splice(index, 1);
            setFilterData((prev) => ({
              ...prev,
              categories: cats,
            }));
          }
        }}
      />
    ))
  : ""}
        </View>
      </View>

      <BigButton
        btnLabel={"Filter"}
        btnWidth={200}
        btnPosition={"relative"}
        marginTop={120}
        Press={onFilter}
        btnHeight={60}
        btnBorder={8}
      ></BigButton>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  FilterText: {
    fontSize: 20,
    // lineHeight: 40,
    fontWeight: "500",
    color: "black",
    textAlign: "center",
    marginTop: 20,
    paddingBottom: 10,
  },

  categoryText: {
    color: "rgba(0, 0, 0, 1)",
    fontSize: 14,
    fontWeight: "400",
    left: 30,
  },
});

export default FilterPage;

// {
// filterData.categories.includes(cat.id)
//                       ? cat.name
//                       : cat.name + "dummy"
//                   }