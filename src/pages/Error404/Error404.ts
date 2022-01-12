// import Error404Element from './Error404.html';
const f = require('./Error404.html')
export class Error404 {
  constructor() {}

  async render() {
    // return Error404Element;
    return f.default
    
  }

  async after_render() {};
}