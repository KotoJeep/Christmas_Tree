import * as noUiSlider from 'nouislider';
import noUiSlider1 from '../../../../modules';
import { FiltersCard } from './filter';
import { RenderCards } from './renderCards';
import { ToySettings } from './toySettings';
import { data } from '../../../data/data';
import { Sort } from './Sort';
import { searchToys } from './search';

export class SliderItems {
  slider: noUiSlider1.Instance;
  resultMin: HTMLElement;
  resultMax: HTMLElement;
  sibiling: HTMLElement;
  arr: Array<HTMLElement>;
  element: HTMLElement;
  start: number;
  end: number;
  step: number;
  currentPos: number[];
  setSlider: number[];
  settingsPos: number[];

  constructor(element: HTMLElement, currentPos: number[]) {
    this.slider = element as noUiSlider1.Instance;
    this.sibiling = this.slider.nextElementSibling as HTMLElement;
    this.resultMin = this.sibiling.firstElementChild as HTMLElement;
    this.resultMax = this.sibiling.lastElementChild as HTMLElement;
    this.arr = [this.resultMin, this.resultMax];
    this.start = 1;
    this.end = 12;
    this.step = 1;
    this.currentPos = currentPos;
    this.settingsPos = new ToySettings().getLocalStorage().itemsCount;
  }

  updateSlider(): void {
    noUiSlider.create(this.slider, {
      start: this.currentPos,
      connect: true,
      range: {
        min: this.start,
        max: this.end,
      },
      step: this.step,
      behaviour: 'drag',
    });

    this.update();
    this.change();
  }

  render(): void {
    const searchInput: HTMLInputElement = document.querySelector('.search-input');
    const filter = new FiltersCard().sortingByFilters(data);
    const sortArr = new Sort(filter).sortingCards();
    const arg = searchInput.value ? searchToys() : sortArr;
    const cards = new RenderCards(arg);
    cards.render();
  }

  update(): void {
    this.slider.noUiSlider.on('update', (values: Array<number>, handle: number) => {
      this.arr[handle].textContent = `${Math.round(values[handle])}`;

      this.render();
    });
  }

  change(): void {
    this.slider.noUiSlider.on('change', () => {
      const settings = new ToySettings();
      settings.setSlideritems();
      settings.setSliderYear();

      this.render();
    });
  }

  set(): void {
    this.slider.noUiSlider.updateOptions({
      start: this.settingsPos,
    });
  }
}

export class SliderYear extends SliderItems {
  constructor(element: HTMLElement, currentPos: number[]) {
    super(element, currentPos);
    this.start = 1940;
    this.end = 2020;
    this.step = 10;
    this.settingsPos = new ToySettings().getLocalStorage().yearCount;
  }
}

export function runSliders(): void {
  const settings = new ToySettings().getLocalStorage();

  const sliderItems = document.getElementById('sliderItems');
  const slider = new SliderItems(sliderItems, settings.itemsCount);
  slider.updateSlider();

  const sliderYear = document.getElementById('sliderYear');
  const slider2 = new SliderYear(sliderYear, settings.yearCount);
  slider2.updateSlider();
}
