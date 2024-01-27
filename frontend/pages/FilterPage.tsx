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
      console.log(response.data);
      navigation.navigate("FilterResponse", { rows: response.data?.rows });
    },
  });

  const { data: allCategories } = useGetAll({
    key: "/portal/category/",
    enabled: true,
  });

  const onFilter = async () => {
    // const data = getValues();
    console.log(filterData);
    mutate(filterData);
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

      <View style={{ top: 15 }}>
        <Text style={styles.categoryText}>Rate</Text>
        <TouchableOpacity
          style={{
            flexDirection: "row",
            paddingVertical: 10,
            left: 30,
            marginTop: 5,
          }}
        >
          {["1", "2", "3", "4", "5"].map((item: string) => (
            <Controller
              control={control}
              name="rate"
              render={({ field: { onChange, onBlur, value } }) => (
                <StarCustomTab
                  label={item}
                  width={50}
                  height={32}
                  margin={3}
                  selected={tabText}
                  setSelected={setTabText}
                  image="star"
                  onPress={() => {
                    setFilterData((prev) => ({
                      ...prev,
                      rate: parseInt(item),
                      // rate:
                      // filterData.rate == parseInt(item)
                      //   ? null
                      //   : parseInt(item),
                    }));
                  }}
                />
              )}
            />
          ))}
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
            ? allCategories.map((cat: CategoryInterface, index: number) => (
                <CustomChips
                  key={cat.id}
                  label={cat.name}
                  selected={
                    filterData.categories.includes(cat.id) ? cat.name : ""
                  }
                  setSelected={() => ""}
                  defaultSelected={false}
                  onPress={() => {
                    if (!filterData.categories.includes(cat.id)) {
                      setFilterData((prev) => ({
                        ...prev,
                        categories: [...prev.categories, cat.id],
                      }));
                    }
                  }}
                ></CustomChips>
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
