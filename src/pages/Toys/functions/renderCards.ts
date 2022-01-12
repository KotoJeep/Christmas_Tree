import { Ball } from '../../../types/types';
import { ToySettings } from './toySettings';
import { showIcons } from './showIcon';

export class RenderCards {
  arr: Array<Ball>;
  wrapper: HTMLElement;
  card: HTMLElement;

  constructor(arr: Array<Ball>) {
    this.arr = arr;
    this.wrapper = document.querySelector('.cards-wrapper');
  }

  render(): void {
    this.wrapper.textContent = '';
    if (this.arr.length === 0) {
      const noMatches = document.createElement('div');
      noMatches.classList.add('cards__no-matches');
      noMatches.textContent = 'Извините, совпадений не обнаружено';
      this.wrapper.append(noMatches);
    }
    this.arr.forEach((el) => {
      const card = document.createElement('div');
      card.classList.add('card');
      const favoriteCard = new ToySettings().getLocalStorage().favourites;
      if (favoriteCard.some((i: number) => i === el.num)) {
        card.classList.add('card_active');
      }
      card.setAttribute('data-num', `${el.num}`);
      const favourite: string = el.favorite === true ? 'да' : 'нет';
      card.innerHTML = `
          <div class="card__title">${el.name}</div>
          <div class="card__img" style="background-image: url(https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/toys/${el.num}.png);"></div>
          <div class="card__total">Количество: ${el.count}</div>
          <div class="card__year">Год покупки: ${el.year}</div>
          <div class="card__form">Форма игрушки: ${el.shape}</div>
          <div class="card__favourite">Размер игрушки: ${el.size}</div>
          <div class="card__favourite-icon">Любимая: ${favourite}</div>
      `;
      card.addEventListener('click', () => {
        card.classList.toggle('card_active');
        this.toggleFavourite(el.num);
        showIcons();
      });

      this.wrapper.append(card);
    });
  }

  toggleFavourite(num: number): void {
    let settingsInfo = new ToySettings().getLocalStorage();
    const idx = settingsInfo.favourites.indexOf(num);
    if (idx > -1) {
      settingsInfo.favourites.splice(idx, 1);
      localStorage.setItem('settingsInfo', JSON.stringify(settingsInfo));
    } else {
      settingsInfo.favourites.push(num);
      localStorage.setItem('settingsInfo', JSON.stringify(settingsInfo));
    }
  }
}
