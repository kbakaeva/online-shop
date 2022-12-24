import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class FilterColor extends Control {
  color: Control<HTMLElement>;
  blockColor: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'color');
    const color = ['purple', 'black', 'red', 'white'];
    const arrayColor: string[] = [];
    this.blockColor = new Control(this.node, 'div', 'color-content');
    this.color = new Control(this.blockColor.node, 'h3', 'color-title', 'Color');
    color.forEach((item) => {
      const filterColorBlock = new Control(this.node, 'div', 'color-block');
      const colorItem = new Control(filterColorBlock.node, 'input', 'color-check', item, 'type', 'checkbox');
      new Control(filterColorBlock.node, 'label', 'color-label', item);
      colorItem.node.onclick = () => {
        const index = arrayColor.indexOf(item);
        if (index === -1) {
          arrayColor.push(item);
          state.content = { ...state.content, color: [...arrayColor] };
        } else {
          arrayColor.splice(index, 1);
          state.content = { ...state.content, color: [...arrayColor] };
        }
      };
    });
  }
}
