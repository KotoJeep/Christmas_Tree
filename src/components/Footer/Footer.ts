// import FooterElement from './Footer.html';
const f = require('./Footer.html')

export class Footer {
  constructor() {}

  async render () {
    return f.default
  }

  async after_render () {};
}
