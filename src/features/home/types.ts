import { MaterialCommunityIcons } from "@expo/vector-icons";
import type { Href } from "expo-router";
import type { ImageSourcePropType } from "react-native";

import type {
  BannerImageKey,
  CategoryImageKey,
  FoodImageKey,
} from "../../constants/imageRegistry";

export type HomeIconName = keyof typeof MaterialCommunityIcons.glyphMap;

export interface HomeCategory {
  id: string;
  imageKey: CategoryImageKey;
  iconName: HomeIconName;
  label: string;
}

export interface HomePromoBanner {
  description: string;
  dotCount: number;
  activeDotIndex: number;
  href: Href;
  imageKey: BannerImageKey;
  imageSource: ImageSourcePropType;
  title: string;
}

export interface HomeProductItem {
  id: string;
  href: Href;
  imageKey: FoodImageKey;
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
