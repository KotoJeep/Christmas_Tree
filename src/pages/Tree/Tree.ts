import { part2 } from './index';
const treeTemplate = require('./Tree.html');

export class Tree {
  constructor() {}

  async render() {
    return treeTemplate.default;
  }

  async after_render() {
    part2();
  }
}
