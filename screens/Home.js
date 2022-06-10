import { View, Text, SafeAreaView, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import HeaderTabs from "../components/HeaderTabs";
import SearchBar from "../components/SearchBar";
import Categories from "../components/Categories";
import RestaurantItems, {
  localRestaurants,
} from "../components/RestaurantItems";
import BottomTabs from "../components/BottomTabs";

const YELP_API_KEY =
  "ROYj0uWT8i0osx9lCUjlNqPrDrDvOb3c_JKZqU9kYAc0q32dA2sQOmuMANPH4OKcRN_sLWlkSM22x3ahY_KToluPkof_gxUViopkjJV3JOkZsZNclpvgdG2GVaueYnYx";

export default function Home() {
  const [restaurantData, setRestaurantData] = useState(localRestaurants);
  const [city, setCity] = useState("San Francisco");
  const [activeTab, setActiveTab] = useState("Delivery");

  const getRestaurantsFromYelp = () => {
    const yelpUrl = `https://api.yelp.com/v3/businesses/search?term=restaurant&location=${city}`;

    const apiOptions = {
      headers: {
        Authorization: `Bearer ${YELP_API_KEY}`,
      },
    };

    return fetch(yelpUrl, apiOptions)
      .then((res) => res.json())
      .then((json) =>
        setRestaurantData(
          json.businesses.filter((business) =>
            business.transactions.includes(activeTab.toLowerCase())
          )
        )
      );
  };

  useEffect(() => {
    getRestaurantsFromYelp();
  }, [city, activeTab]);

  return (
    <SafeAreaView style={{ backgroundColor: "#eee", flex: 1 }}>
      <View style={{ backgroundColor: "white", padding: 15 }}>
        <HeaderTabs activeTab={activeTab} setActiveTab={setActiveTab}/>
        <SearchBar cityHandler={setCity} />
      </View>
      <Categories />
      <ScrollView showsVerticalScrollIndicator={false}>
        <RestaurantItems restaurantData={restaurantData} />
      </ScrollView>
      <View>
        <BottomTabs />
      </View>
    </SafeAreaView>
  );
}
