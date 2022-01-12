import { Ball, Filter } from '../../../types/types';
import { ToySettings } from './toySettings';
import { data } from '../../../data/data';

export class FiltersCard {
  dataCard: Array<Ball>;
  filter: Filter;

  constructor() {
    this.dataCard = data;
    this.filter = new ToySettings().getLocalStorage();
  }

  sortingByFilters(arr: Array<Ball>): Array<Ball> {
    const filterValue: Array<Ball> = data.filter(
      (ball) =>
        ball.count >= this.filter.itemsCount[0] &&
        ball.count <= this.filter.itemsCount[1] &&
        ball.year >= this.filter.yearCount[0] &&
        ball.year <= this.filter.yearCount[1] &&
        this.filter.color.some((el) => el === ball.color) &&
        this.filter.forms.some((el) => el === ball.shape) &&
        this.filter.size.some((el) => el === ball.size)
    );

    if (this.filter.onlyFavourites) {
      return filterValue.filter((el) => el.favorite === true);
    }
    return filterValue;
  }
}
