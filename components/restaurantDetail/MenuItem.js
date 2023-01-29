import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import React from "react";
import { Divider } from "react-native-elements";
import BouncyCheckbox from "react-native-bouncy-checkbox";
import { useDispatch } from "react-redux";

const styles = StyleSheet.create({
  MenuItemStyle: {
    flexDirection: "row",
    justifyContent: "space-between",
    margin: 10,
  },

  titleStyle: {
    fontSize: 15,
    fontWeight: "600",
  },
});

const foods = [
  {
    title: "BBQ Wings",
    description: "Chicken wings glazed in BBQ sauce",
    price: "$11.00",
    image:
      "https://dinnerthendessert.com/wp-content/uploads/2019/11/BBQ-Chicken-Wings-4x3.jpg",
  },
  {
    title: "Original Wings",
    description: "Fried Chicken wings",
    price: "$10.00",
    image:
      "https://www.lifesambrosia.com/wp-content/uploads/Deep-Fried-Chicken-Wings-Recipe-Photo-11-scaled.jpg",
  },
  {
    title: "Lemon Pepper Wings",
    description: "Chicken wings flavored with Lemons and Pepper",
    price: "$13.00",
    image:
      "https://foodtasia.com/wp-content/uploads/2020/07/lemon-pepper-wings-12.jpg",
  },
  {
    title: "Atomic Spicy Wings",
    description:
      "Chicken wings flavored with Ghost Pepper and House Special Spicy Sauce",
    price: "$13.00",
    image:
      "https://assets.website-files.com/5ba3ae1ad65e6e2129651a85/5bc492f7ca643add6a2f7c0a_DSC09428.jpg",
  },
  {
    title: "Garlic Parmesan Wings",
    description: "Chicken wings cooked in garlic and parmesan",
    price: "$13.00",
    image:
      "https://www.spendwithpennies.com/wp-content/uploads/2019/03/SWP-Garlic-Parmesan-Wings-SpendWithPennies-7.jpg",
  },
];

export default function MenuItem({ restaurantName }) {
  const dispatch = useDispatch();
  const selectItem = (item, checkboxValue) =>
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        ...item,
        restaurantName: restaurantName,
        checkboxValue: checkboxValue,
      },
    });

  return (
    <ScrollView showsVerticalScrollIndicator={false}>
      {foods.map((food, index) => (
        <View key={index}>
          <View style={styles.MenuItemStyle}>
            <BouncyCheckbox
              iconStyle={{ borderColor: "lightgray", borderRadius: 0 }}
              fillColor={"green"}
              onPress={(checkboxValue) => selectItem(food, checkboxValue)}
            />
            <FoodInfo food={food} />
            <FoodImage food={food} />
          </View>
          <Divider width={0.5} orientation={"vertical"} />
        </View>
      ))}
    </ScrollView>
  );
}

const FoodInfo = (props) => (
  <View
    style={{
      width: 200,
      justifyContent: "space-evenly",
    }}
  >
    <Text style={styles.titleStyle}>{props.food.title}</Text>
    <Text>{props.food.description}</Text>
    <Text>{props.food.price}</Text>
  </View>
);

const FoodImage = (props) => (
  <View>
    <Image
      source={{ uri: props.food.image }}
      style={{ width: 100, height: 100, borderRadius: 8 }}
    />
  </View>
);
