import type { HomeScreenMock } from "./types";

// TODO: Replace the monogram avatar and cropped home photos with final exported assets when available.
export const homeMock: HomeScreenMock = {
  header: {
    greeting: "Good Morning",
    subtitle: "Rise And Shierll It's Breakfast Time",
  },
  searchPlaceholder: "Search",
  categories: [
    { id: "snacks", iconName: "food-croissant", label: "Snacks" },
    { id: "meal", iconName: "silverware-fork-knife", label: "Meal" },
    { id: "vegan", iconName: "food-apple-outline", label: "Vegan" },
    { id: "dessert", iconName: "ice-cream", label: "Dessert" },
    { id: "drinks", iconName: "cup-outline", label: "Drinks" },
  ],
  promoBanner: {
    description: "Experience our\ndelicious new dish",
    title: "30% OFF",
    imageSource: require("../../../assets/home/promo-pizza.jpg"),
    dotCount: 3,
    activeDotIndex: 1,
    href: "/(tabs)/menu",
  },
  bestSeller: [
    {
      id: "best-seller-1",
      title: "Sushi Set",
      subtitle: "Fresh rolls",
      price: "$103.0",
      rating: "4.8",
      imageSource: require("../../../assets/home/best-seller-1.jpg"),
      href: "/(tabs)/menu",
    },
    {
      id: "best-seller-2",
      title: "Special Meal",
      subtitle: "Chef choice",
      price: "$50.0",
      rating: "4.7",
      imageSource: require("../../../assets/home/best-seller-2.jpg"),
      href: "/(tabs)/menu",
    },
    {
      id: "best-seller-3",
      title: "Italian Pasta",
      subtitle: "Creamy sauce",
      price: "$12.99",
      rating: "4.9",
      imageSource: require("../../../assets/home/best-seller-3.jpg"),
      href: "/(tabs)/menu",
    },
    {
      id: "best-seller-4",
      title: "Berry Bowl",
      subtitle: "Fruit mix",
      price: "$8.20",
      rating: "4.8",
      imageSource: require("../../../assets/home/best-seller-4.jpg"),
      href: "/(tabs)/menu",
    },
  ],
  recommend: [
    {
      id: "recommend-1",
      title: "Classic Burger",
      subtitle: "Loaded with fresh greens",
      price: "$10.0",
      rating: "5.0",
      imageSource: require("../../../assets/home/recommend-1.jpg"),
      href: "/(tabs)/menu",
    },
    {
      id: "recommend-2",
      title: "Spring Roll",
      subtitle: "Crispy and vibrant",
      price: "$25.0",
      rating: "5.0",
      imageSource: require("../../../assets/home/recommend-2.jpg"),
      href: "/(tabs)/menu",
    },
  ],
};
