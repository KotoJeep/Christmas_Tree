import { AppSettings } from './appSettings';
import { Snow } from './snow';
import { Garland } from './garland';
import { drugAndDrop } from './drugAndDrop';
import { TreeToys } from './treeToys';
export { Tree } from '../Tree';

export class SettengsTree {
  treeImg: HTMLImageElement;
  btnsTree: NodeListOf<HTMLElement>;
  treeBlock: HTMLElement;
  btnsBg: NodeListOf<HTMLElement>;
  audio: HTMLAudioElement;
  togglePlayBtn: HTMLElement;
  toggleSnowBtn: HTMLElement;
  toggleGarland: HTMLInputElement;
  resetBtn: HTMLElement;

  constructor() {
    this.treeImg = document.querySelector('.tree-img');
    this.btnsTree = document.querySelectorAll('.settings__tree-item');
    this.treeBlock = document.querySelector('.tree');
    this.btnsBg = document.querySelectorAll('.settings__background-item');
    this.audio = document.querySelector('.settings-audio');
    this.togglePlayBtn = document.querySelector('.settings__sound');
    this.toggleSnowBtn = document.querySelector('.settings__snow');
    this.toggleGarland = document.querySelector('#settingsColor');
    this.resetBtn = document.querySelector('.settings__btn-reset');
  }

  changeTree(): void {
    this.btnsTree.forEach((btn) => {
      btn.addEventListener('click', () => {
        const atr = btn.getAttribute('data-tree');
        this.treeImg.src = `https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/tree/${atr}.png`;
        const settings = new AppSettings().getLS();
        settings.tree = atr;
        new AppSettings().setLS(settings);
      });
    });
  }

  changeBg(): void {
    this.btnsBg.forEach((btn) => {
      btn.addEventListener('click', () => {
        const atr = btn.getAttribute('data-bg');
        this.treeBlock.style.backgroundImage = `url(https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/bg/bg${atr}.jpg)`;
        const settings = new AppSettings().getLS();
        settings.background = atr;
        new AppSettings().setLS(settings);
      });
    });
  }

  toggleMusic(): void {
    const settings = new AppSettings().getLS();
    if (!settings.sound) {
      this.togglePlayBtn.classList.add('icon-active');
      this.audio.volume = 0.2;
      this.audio.play();
      if (this.audio.ended) {
        this.audio.play();
      }
      settings.sound = true;
      new AppSettings().setLS(settings);
    } else if (settings.sound) {
      this.audio.pause();
      this.togglePlayBtn.classList.remove('icon-active');
      settings.sound = false;
      new AppSettings().setLS(settings);
    }
  }

  toggleSnow(): void {
    const settings = new AppSettings().getLS();
    const snow = new Snow();
    if (!settings.snow) {
      this.toggleSnowBtn.classList.add('icon-active');
      snow.createSnowflake();
      settings.snow = true;
      new AppSettings().setLS(settings);
    } else if (settings.snow) {
      this.toggleSnowBtn.classList.remove('icon-active');
      snow.removeSnowflake();
      settings.snow = false;
      new AppSettings().setLS(settings);
    }
  }
  // assets/tree/${settings.tree}.png
  onLoad(): void {
    const settings = new AppSettings().getLS();
    this.treeBlock.style.backgroundImage = `url(https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/bg/bg${settings.background}.jpg)`;
    this.treeImg.src = `https://raw.githubusercontent.com/KotoJeep/assets/christmas-task/tree/${settings.tree}.png`;
    if (settings.snow) {
      this.toggleSnowBtn.classList.add('icon-active');
      new Snow().createSnowflake();
    }

    if (settings.sound === true) {
      this.togglePlayBtn.classList.add('icon-active');
      this.audio.volume = 0.2;
      this.audio.play();
      if (this.audio.ended) {
        this.audio.play();
      }
    }

    if (settings.garland !== '') {
      this.toggleGarland.checked = true;
      new Garland().createLights(settings.garland);
    }
  }

  toggleBtn(): void {
    this.toggleSnowBtn.addEventListener('click', () => {
      this.toggleSnow();
    });
    this.togglePlayBtn.addEventListener('click', () => {
      this.toggleMusic();
    });
    this.changeBg();
    this.changeTree();

    this.toggleGarland.addEventListener('change', () => {
      const garland = new Garland();
      const settings = new AppSettings().getLS();
      if (this.toggleGarland.checked) {
        if (settings.garland === '') {
          garland.createLights('multicolor');
          settings.garland = 'multicolor';
          new AppSettings().setLS(settings);
        } else {
          garland.createLights(settings.garland);
        }
      } else {
        garland.removeLights();
        settings.garland = '';
        new AppSettings().setLS(settings);
      }
    });
    new Garland().setColor();

    this.resetBtn.addEventListener('click', () => {
      new AppSettings().setDefault();
      this.toggleGarland.checked = false;
      new Garland().removeLights();
      this.onLoad();
      document.querySelector('.tree-wrapper').textContent = '';
      new TreeToys().renderCards();
      drugAndDrop();
    });
  }
}
