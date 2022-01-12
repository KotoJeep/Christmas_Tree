import { Ball } from '../../../types/types';
export class Sort {
  arr: Array<Ball>;

  constructor(arr: Array<Ball> | []) {
    this.arr = arr;
  }

  default(): Array<Ball> | [] {
    return this.arr.sort((a, b) => (a.num > b.num ? 1 : b.num > a.num ? -1 : 0));
  }

  fromNewToOld(): Array<Ball> | [] {
    return this.arr.sort((a, b) => (b.year > a.year ? 1 : a.year > b.year ? -1 : 0));
  }

  fromOldToNew(): Array<Ball> | [] {
    return this.arr.sort((a, b) => (a.year > b.year ? 1 : b.year > a.year ? -1 : 0));
  }

  alphabetFromLast(): Array<Ball> | [] {
    return this.arr.sort((a, b) => (b.name > a.name ? 1 : a.name > b.name ? -1 : 0));
  }

  alphabetFromFirst(): Array<Ball> | [] {
    return this.arr.sort((a, b) => (a.name > b.name ? 1 : b.name > a.name ? -1 : 0));
  }

  sortingCards(): Array<Ball> {
    const selector: HTMLSelectElement = document.querySelector('#sortSelect');
    switch (selector.value) {
      case 'none':
        return this.default();
        break;
      case 'ascending':
        return this.alphabetFromFirst();
        break;
      case 'descending':
        return this.alphabetFromLast();
        break;
      case 'newToOld':
        return this.fromNewToOld();
        break;
      case 'OldToNew':
        return this.fromOldToNew();
        break;
    }
  }
}
