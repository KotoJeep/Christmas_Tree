import { settingsApp } from '../../../types/types';

export class AppSettings {
  constructor() {}

  setLS(item: settingsApp): void {
    localStorage.setItem('appSettings', JSON.stringify(item));
  }

  setDefault(): void {
    const appSettings: settingsApp = {
      sound: false,
      snow: false,
      tree: '1',
      background: '1',
      garland: '',
    };
    this.setLS(appSettings);
  }

  getLS(): settingsApp {
    if (!localStorage.getItem('appSettings')) this.setDefault();
    return JSON.parse(localStorage.getItem('appSettings'));
  }
}
