// import HomeElement from './Home.html';
const f = require('./Home.html')
export class Home {
  constructor() {}

  async render () {
    // return HomeElement;
    return f.default
  }

  async after_render () {};
}
