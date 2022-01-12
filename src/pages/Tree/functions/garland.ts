import { AppSettings } from './appSettings';

export class Garland {
  container: HTMLElement;
  size: number[];
  translate: number[];
  rotate: Array<number[]>;
  buttons: NodeListOf<HTMLElement>;
  toggler: HTMLInputElement;

  constructor() {
    this.container = document.querySelector('.tree-garland');
    this.buttons = document.querySelectorAll('.settings__garland-item');
    this.toggler = document.querySelector('#settingsColor');
    this.size = [210, 350, 500, 550, 800];
    this.translate = [100, 110, 150, 225, 225];
    this.rotate = [
      [57, 65, 77, 89, 101, 113, 125],
      [40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140],
      [48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132],
      [48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132],
      [30, 36, 42, 48, 54, 60, 66, 72, 78, 84, 90, 96, 102, 108, 114, 120, 126, 132, 138],
    ];
  }

  createLights(className: string): void {
    this.container.textContent = '';
    for (let i = 0; i < 5; i++) {
      const lightrope = document.createElement('ul');
      lightrope.classList.add('lightrope');
      lightrope.style.width = `${this.size[i]}px`;
      lightrope.style.height = `${this.size[i]}px`;
      this.rotate[i].forEach((el) => {
        const li = document.createElement('li');
        li.classList.add(className);
        li.style.transform = `rotate(${el}deg) translate(${this.translate[i]}px) rotate(-${el}deg)`;
        lightrope.append(li);
      });
      this.container.append(lightrope);
    }
  }

  removeLights(): void {
    this.container.textContent = '';
  }

  setColor(): void {
    this.buttons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const atr = btn.getAttribute('data-color');
        this.createLights(atr);
        let settings = new AppSettings().getLS();
        settings.garland = atr;
        new AppSettings().setLS(settings);
        (document.querySelector('#settingsColor') as HTMLInputElement).checked = true;
      });
    });
  }
}
