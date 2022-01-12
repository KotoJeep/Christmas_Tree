export class Snow {
  container: HTMLElement;

  constructor() {
    this.container = document.querySelector('.tree-snowflakes');
  }

  createSnowflake(): void {
    this.container.textContent = '';
    for (let i = 0; i < 200; i++) {
      const snowflake: HTMLElement = document.createElement('div');
      snowflake.classList.add('snow');
      this.container.append(snowflake);
    }
  }

  removeSnowflake(): void {
    this.container.textContent = '';
  }
}
