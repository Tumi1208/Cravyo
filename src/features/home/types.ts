import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import type { ImageSourcePropType } from "react-native";

export type HomeIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export interface HomeCategory {
  id: string;
  iconName: HomeIconName;
  label: string;
}

export interface HomePromoBanner {
  description: string;
  dotCount: number;
  activeDotIndex: number;
  href: Href;
  imageSource: ImageSourcePropType;
  title: string;
}

export interface HomeProductItem {
  id: string;
  href: Href;
  imageSource: ImageSourcePropType;
  price: string;
  rating: string;
  subtitle: string;
  title: string;
}

export interface HomeScreenMock {
  categories: HomeCategory[];
  header: {
    greeting: string;
    subtitle: string;
  };
  bestSeller: HomeProductItem[];
  promoBanner: HomePromoBanner;
  recommend: HomeProductItem[];
  searchPlaceholder: string;
}
