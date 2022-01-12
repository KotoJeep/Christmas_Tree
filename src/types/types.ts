export type Ball = {
  num: number;
  name: string;
  count: number;
  year: number;
  shape: string;
  color: string;
  size: string;
  favorite: boolean;
};

export interface Filter {
  sortType: string;
  forms: string[];
  itemsCount: number[];
  yearCount: number[];
  color: string[];
  size: string[];
  favourites: number[];
  onlyFavourites: boolean;
}

export interface settingsApp {
  sound: boolean;
  snow: boolean;
  tree: string;
  background: string;
  garland: string;
}
