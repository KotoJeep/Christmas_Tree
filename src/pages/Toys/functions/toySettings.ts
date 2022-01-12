import { Filter } from '../../../types/types';

export class ToySettings {
  activeColors: string[];
  activeSize: string[];
  forms: string[];
  yearCount: number[];
  itemsCount: number[];

  constructor() {
    this.activeColors = this.getLocalStorage().color;
    this.activeSize = this.getLocalStorage().size;
    this.forms = [];
    this.yearCount;
    this.itemsCount;
  }

  setDefault(): void {
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
    this.setLocalStorage(settingsInfo);
  }

  setLocalStorage(item: Filter): void {
    localStorage.setItem('settingsInfo', JSON.stringify(item));
  }

  getLocalStorage(): Filter {
    if (!localStorage.getItem('settingsInfo')) this.setDefault();
    return JSON.parse(localStorage.getItem('settingsInfo'));
  }

  setColors(): void {
    const colorsInput = document.querySelectorAll('.colors__input');
    for (let i = 0; i < colorsInput.length; i++) {
      const el = colorsInput[i] as HTMLInputElement;
      el.addEventListener('change', () => {
        const atr: string = el.getAttribute('data-color');
        if (el.checked === true) {
          if (this.activeColors.some((j) => j === atr)) {
            this.activeColors = [];
          }
          this.activeColors.push(atr);
        } else if (el.checked === false) {
          this.activeColors.splice(this.activeColors.indexOf(atr), 1);
        }
        const settings = this.getLocalStorage();
        settings.color = this.activeColors;
        if (this.activeColors.length === 0) {
          settings.color = ['белый', 'желтый', 'красный', 'синий', 'зелёный'];
        }
        this.setLocalStorage(settings);
      });
    }
  }

  setSize(): void {
    const sizeInputs = document.querySelectorAll('.size_input');
    for (let i = 0; i < sizeInputs.length; i++) {
      const el = sizeInputs[i] as HTMLInputElement;
      el.addEventListener('change', () => {
        const atr: string = el.getAttribute('data-size');
        if (el.checked === true) {
          if (this.activeSize.some((j) => j === atr)) {
            this.activeSize = [];
          }
          this.activeSize.push(atr);
        } else if (el.checked === false) {
          this.activeSize.splice(this.activeSize.indexOf(atr), 1);
        }
        const settings = this.getLocalStorage();
        settings.size = this.activeSize;
        if (this.activeSize.length === 0) {
          settings.size = ['большой', 'средний', 'малый'];
        }
        this.setLocalStorage(settings);
      });
    }
  }

  setForm(): void {
    document.querySelectorAll('[data-form]').forEach((el: HTMLInputElement) => {
      el.addEventListener('click', () => {
        const atr: string = el.getAttribute('data-form');
        if (!el.classList.contains('icon-active')) {
          el.classList.add('icon-active');
          this.forms.push(atr);
        } else {
          el.classList.remove('icon-active');
          this.forms.splice(this.forms.indexOf(atr), 1);
        }
        const setForm = this.getLocalStorage();
        setForm.forms = this.forms;
        if (this.forms.length === 0) {
          setForm.forms = ['колокольчик', 'шар', 'шишка', 'снежинка', 'фигурка'];
        }
        this.setLocalStorage(setForm);
      });
    });
  }

  setSlideritems(): void {
    const minValue: number = Number(document.querySelector('#itemsResultMin').textContent),
      maxValue: number = Number(document.querySelector('#itemsResultMax').textContent);
    const setSlider = this.getLocalStorage();
    setSlider.itemsCount = [minValue, maxValue];
    this.setLocalStorage(setSlider);
  }

  setSliderYear(): void {
    const minValue: number = Number(document.querySelector('#yearResultMin').textContent),
      maxValue: number = Number(document.querySelector('#yearResultMax').textContent);
    const setSlider = this.getLocalStorage();
    setSlider.yearCount = [minValue, maxValue];
    this.setLocalStorage(setSlider);
  }
}
