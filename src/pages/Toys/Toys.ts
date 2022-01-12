import { part1 } from './index';

const toysTempalate = require('./Toys.html');
export class Toys {
  constructor() {}

  async render() {
    return toysTempalate.default;
  }

  async after_render() {
    part1();
  }
}
