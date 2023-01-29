import { View, Text, Image } from "react-native";
import React from "react";


export default function About(props) {
  const { name, image, price, reviews, rating, categories } =
    props.route.params;

  const formatedCategories = categories.map((cat) => cat.title).join(" • ");
  const description = `${formatedCategories} ${
    price ? " • " + price : ""
  } ${rating} ⭐ (${reviews}+)`;
  return (
    <View>
      <RestaurantImage image={image} />
      <RestaurantName name={name} />
      <RestaurantDescription description={description} />
    </View>
  );
}

const RestaurantImage = (props) => (
  <Image source={{ uri: props.image }} style={{ width: "100%", height: 180 }} />
);

const RestaurantName = (props) => (
  <Text
    style={{
      fontSize: 25,
      fontWeight: "600",
      marginTop: 5,
      marginHorizontal: 10,
    }}
  >
    {props.name}
  </Text>
);

const RestaurantDescription = (props) => (
  <Text
    style={{
      marginTop: 10,
      marginHorizontal: 10,
      fontWeight: "400",
      fontSize: 12,
    }}
  >
    {props.description}
  </Text>
);
