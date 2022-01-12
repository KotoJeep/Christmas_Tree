// import { ToySettings } from '../../Toys';
import { ToySettings } from '../../Toys/functions/toySettings';
import { data } from '../../../data/data';

export class TreeToys {
  container: HTMLElement;
  constructor() {
    this.container = document.querySelector('.collection__toys-wrapper');
  }
  renderCards(): void {
    this.container.textContent = '';
    const favourites = new ToySettings().getLocalStorage().favourites;
    const arrToys = data.filter((el) => favourites.some((i) => i === el.num));
    if (arrToys.length !== 0) {
      for (let i = 0; i < arrToys.length; i++) {
        const el = arrToys[i];
        this.createCard(el.num, el.count);
      }
    } else {
      const data20 = data.slice(0, 20);
      for (let i = 0; i < data20.length; i++) {
        const el = data20[i];
        this.createCard(el.num, el.count);
      }
    }
  }

  createCard(number: number, count: number): void {
    const toyItem = document.createElement('div');
    toyItem.classList.add('collection__toys-item');

    for (let i = 0; i < count; i++) {
      const img = document.createElement('img');
      img.classList.add('collection__toys-img');
      img.src = `https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/toys/${number}.png`;
      img.draggable = true;
      img.id = `toy-${number}-${i}`;
      toyItem.append(img);
    }

    const countEl = document.createElement('div');
    countEl.classList.add('collection__toys-count');
    countEl.textContent = `${count}`;
    toyItem.append(countEl);

    this.container.append(toyItem);
  }
}
