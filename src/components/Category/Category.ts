// import CategoryElement from './Category.html';
const f = require('./Category.html')
export class Category {
  constructor() {}

  async render () {
    // return CategoryElement;
    return f.default
  }

  async after_render () {};
}
