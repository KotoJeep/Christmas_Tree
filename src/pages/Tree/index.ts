export { Tree } from './Tree';

import { SettengsTree } from './functions/settingsTree';
import { Garland } from './functions/garland';
// import { ToySettings } from '../Toys';
import { TreeToys } from './functions/treeToys';
import { drugAndDrop } from './functions/drugAndDrop';

export function part2() {
  const treeSettings = new SettengsTree();
  treeSettings.onLoad();
  treeSettings.toggleBtn();

  const garland = new Garland();

  new TreeToys().renderCards();
  //======================================================
  drugAndDrop();
}
