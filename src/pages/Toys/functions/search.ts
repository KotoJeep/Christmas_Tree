import { FiltersCard } from './filter';
import { Sort } from './Sort';
import { data } from '../../../data/data';
import { Ball } from '../../../types/types';
import { RenderCards } from './renderCards';

export function searchToys(): Array<Ball> {
  const searchInput: HTMLInputElement = document.querySelector('.search-input');
  const filter = new FiltersCard().sortingByFilters(data);
  const sortArr = new Sort(filter).sortingCards();
  const resultArr: Array<Ball> = sortArr.filter((card) => {
    return card.name.toLocaleLowerCase().includes(searchInput.value.toLocaleLowerCase());
  });

  return resultArr;
}
