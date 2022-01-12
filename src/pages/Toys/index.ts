export { Toys } from './Toys';

import { start, showIcons } from './functions/showIcon';
import { data } from '../../data/data';
import { runSliders, SliderItems } from './functions/sliders';
import { RenderCards } from './functions/renderCards';
// import { sortingCards } from './functions/Sort';
import { ToySettings } from './functions/toySettings';
import { FiltersCard } from './functions/filter';
import { Sort } from './functions/Sort';

export function part1() {
  start();
  runSliders();

  const toyset = new ToySettings();
  toyset.setColors();
  toyset.setSize();
  toyset.setForm();

  showIcons();

  const filter = new FiltersCard().sortingByFilters(data);
  const sortArr = new Sort(filter).sortingCards();
  const cards = new RenderCards(sortArr);
  cards.render();
}
