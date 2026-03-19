import type { ImageSourcePropType } from "react-native";

export type FoodImageKey =
  | "sushi-1"
  | "curry-1"
  | "lasagna-1"
  | "cupcake-1"
  | "burger-1"
  | "spring-roll-1"
  | "pizza-1";

export type BannerImageKey = "promo-pizza";

export type CategoryImageKey = "snacks" | "meal" | "vegan" | "dessert" | "drinks";

export type HomeImageKey = FoodImageKey | BannerImageKey | CategoryImageKey;

type ImageRegistryGroup = "foods" | "banners" | "categories";
type ImageFileExtension = "jpg" | "png";

export type LocalImageRegistryEntry<TKey extends HomeImageKey = HomeImageKey> = {
  fileName: string;
  group: ImageRegistryGroup;
  key: TKey;
  relativePath: string;
  source: ImageSourcePropType;
};

function createImageRegistryEntry<TKey extends HomeImageKey>(
  group: ImageRegistryGroup,
  key: TKey,
  extension: ImageFileExtension,
  source: ImageSourcePropType,
): LocalImageRegistryEntry<TKey> {
  const fileName = `${key}.${extension}`;
  const relativePath = `assets/images/${group}/${fileName}`;

  return {
    key,
    group,
    fileName,
    relativePath,
    source,
  };
}

export const foodImageRegistry = {
  "sushi-1": createImageRegistryEntry(
    "foods",
    "sushi-1",
    "jpg",
    require("../../assets/images/foods/sushi-1.jpg"),
  ),
  "curry-1": createImageRegistryEntry(
    "foods",
    "curry-1",
    "jpg",
    require("../../assets/images/foods/curry-1.jpg"),
  ),
  "lasagna-1": createImageRegistryEntry(
    "foods",
    "lasagna-1",
    "jpg",
    require("../../assets/images/foods/lasagna-1.jpg"),
  ),
  "cupcake-1": createImageRegistryEntry(
    "foods",
    "cupcake-1",
    "jpg",
    require("../../assets/images/foods/cupcake-1.jpg"),
  ),
  "burger-1": createImageRegistryEntry(
    "foods",
    "burger-1",
    "jpg",
    require("../../assets/images/foods/burger-1.jpg"),
  ),
  "spring-roll-1": createImageRegistryEntry(
    "foods",
    "spring-roll-1",
    "jpg",
    require("../../assets/images/foods/spring-roll-1.jpg"),
  ),
  "pizza-1": createImageRegistryEntry(
    "foods",
    "pizza-1",
    "jpg",
    require("../../assets/images/foods/pizza-1.jpg"),
  ),
} satisfies Record<FoodImageKey, LocalImageRegistryEntry<FoodImageKey>>;

export const bannerImageRegistry = {
  "promo-pizza": createImageRegistryEntry(
    "banners",
    "promo-pizza",
    "jpg",
    require("../../assets/images/banners/promo-pizza.jpg"),
  ),
} satisfies Record<BannerImageKey, LocalImageRegistryEntry<BannerImageKey>>;

export const categoryImageRegistry = {
  snacks: createImageRegistryEntry(
    "categories",
    "snacks",
    "png",
    require("../../assets/images/categories/snacks.png"),
  ),
  meal: createImageRegistryEntry(
    "categories",
    "meal",
    "png",
    require("../../assets/images/categories/meal.png"),
  ),
  vegan: createImageRegistryEntry(
    "categories",
    "vegan",
    "png",
    require("../../assets/images/categories/vegan.png"),
  ),
  dessert: createImageRegistryEntry(
    "categories",
    "dessert",
    "png",
    require("../../assets/images/categories/dessert.png"),
  ),
  drinks: createImageRegistryEntry(
    "categories",
    "drinks",
    "png",
    require("../../assets/images/categories/drinks.png"),
  ),
} satisfies Record<CategoryImageKey, LocalImageRegistryEntry<CategoryImageKey>>;

export const imageRegistry = {
  foods: foodImageRegistry,
  banners: bannerImageRegistry,
  categories: categoryImageRegistry,
} as const;

const homeImageSources: Record<HomeImageKey, ImageSourcePropType> = {
  "sushi-1": foodImageRegistry["sushi-1"].source,
  "curry-1": foodImageRegistry["curry-1"].source,
  "lasagna-1": foodImageRegistry["lasagna-1"].source,
  "cupcake-1": foodImageRegistry["cupcake-1"].source,
  "burger-1": foodImageRegistry["burger-1"].source,
  "spring-roll-1": foodImageRegistry["spring-roll-1"].source,
  "pizza-1": foodImageRegistry["pizza-1"].source,
  "promo-pizza": bannerImageRegistry["promo-pizza"].source,
  snacks: categoryImageRegistry.snacks.source,
  meal: categoryImageRegistry.meal.source,
  vegan: categoryImageRegistry.vegan.source,
  dessert: categoryImageRegistry.dessert.source,
  drinks: categoryImageRegistry.drinks.source,
};

export function getHomeImageSource(key: HomeImageKey): ImageSourcePropType {
  return homeImageSources[key];
}
