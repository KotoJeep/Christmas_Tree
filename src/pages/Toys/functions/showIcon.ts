import { ToySettings } from './toySettings';
import { FiltersCard } from './filter';
import { RenderCards } from './renderCards';
import { data } from '../../../data/data';
import { runSliders, SliderItems, SliderYear } from './sliders';
import { Filter } from '../../../types/types';
import { Sort } from './Sort';
import { searchToys } from './search';

export function showIcons(): void {
  const settings = new ToySettings().getLocalStorage();
  const sortSelect: HTMLSelectElement = document.querySelector('.sort__select'),
    toyForms = document.querySelectorAll('.forms__item'),
    toyColors = document.querySelectorAll('.colors__input'),
    toySize = document.querySelectorAll('.size_input'),
    favouritesCount: HTMLElement = document.querySelector('.navbar-search__favourites > span'),
    defaultBtn: HTMLElement = document.querySelector('.btns__reset-filter'),
    toyFavourites: HTMLInputElement = document.querySelector('#favourites'),
    searchInput: HTMLInputElement = document.querySelector('.search-input');

  const render = (): void => {
    const filter = new FiltersCard().sortingByFilters(data);
    const sortArr = new Sort(filter).sortingCards();
    const arg = searchInput.value ? searchToys() : sortArr;
    const cards = new RenderCards(arg);
    cards.render();
  };

  const showFavorites = () => {
    const settings = new ToySettings().getLocalStorage();
    if (toyFavourites.checked) {
      settings.onlyFavourites = true;
      new ToySettings().setLocalStorage(settings);
    } else {
      settings.onlyFavourites = false;
      new ToySettings().setLocalStorage(settings);
    }
  };

  sortSelect.value = settings.sortType;

  toyForms.forEach((form) => {
    const atr = form.getAttribute('data-form');
    if (settings.forms.length < 5) {
      if (settings.forms.some((el) => el === atr)) {
        form.classList.add('icon-active');
      }
    }
    form.addEventListener('click', () => {
      render();
    });
  });

  toyColors.forEach((color: HTMLInputElement) => {
    const atr = color.getAttribute('data-color');
    if (settings.color.length < 5) {
      if (settings.color.some((el) => el === atr)) {
        color.checked = true;
      }
    }

    color.addEventListener('change', () => {
      render();
    });
  });

  toySize.forEach((size: HTMLInputElement) => {
    const atr = size.getAttribute('data-size');

    if (settings.size.length < 3) {
      if (settings.size.some((el) => el === atr)) {
        size.checked = true;
      }
    }
    size.addEventListener('change', () => {
      render();
    });
  });

  favouritesCount.textContent = `${settings.favourites.length}`;

  defaultBtn.addEventListener('click', () => {
    new ToySettings().setDefault();
    const classFilt = new FiltersCard().sortingByFilters(data);
    const classRender = new RenderCards(classFilt);
    classRender.render();
    // render();
    toyForms.forEach((el) => el.classList.remove('icon-active'));
    toySize.forEach((el: HTMLInputElement) => (el.checked = false));
    toyColors.forEach((el: HTMLInputElement) => (el.checked = false));
    favouritesCount.textContent = `0`;
    toyFavourites.checked = false;

    // runSliders();
    const sliderItems: HTMLElement = document.getElementById('sliderItems');
    const sliderYear: HTMLElement = document.getElementById('sliderYear');
    const itemPos = new ToySettings().getLocalStorage().itemsCount;
    const yearPos = new ToySettings().getLocalStorage().yearCount;
    new SliderItems(sliderItems, itemPos).set();
    new SliderYear(sliderYear, yearPos).set();
  });

  toyFavourites.checked = settings.onlyFavourites ? true : false;
  toyFavourites.addEventListener('click', () => {
    showFavorites();
    render();
  });

  sortSelect.addEventListener('change', () => {
    render();
    const settings = new ToySettings().getLocalStorage();
    settings.sortType = sortSelect.value;
    new ToySettings().setLocalStorage(settings);
  });

  searchInput.addEventListener('keyup', () => {
    const result = searchToys();
    new RenderCards(result).render();
  });
}

export function start() {
  if (!localStorage.getItem('settingsInfo')) {
    const settingsInfo: Filter = {
      sortType: 'none',
      forms: ['фигурка', 'шар', 'колокольчик', 'шишка', 'снежинка'],
      itemsCount: [1, 12],
      yearCount: [1940, 2020],
      color: ['белый', 'желтый', 'красный', 'синий', 'зелёный'],
      size: ['большой', 'средний', 'малый'],
      favourites: [],
      onlyFavourites: false,
    };
    localStorage.setItem('settingsInfo', JSON.stringify(settingsInfo));
  }
}
