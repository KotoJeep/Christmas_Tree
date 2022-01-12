// import HeaderElement from './Header.html';
const f = require('./Header.html')
export class Header {
  constructor() {}

  async render () {
    // return HeaderElement;
    return f.default
  }

  async after_render () {};
}
