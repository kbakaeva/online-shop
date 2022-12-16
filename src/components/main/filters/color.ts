import Control from '../../../control/control';
import {State} from '../../../control/filterState';

export class FilterColor extends Control {
  color: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'color');
    const color = ['purple', 'black', 'red', 'white'];
    const arrayColor: string[] = [];
    this.color = new Control(this.node, 'h3', 'color-title', 'По Цвету:');
    color.forEach((item) => {
      const filterColorBlock = new Control(this.node, 'div', 'color-block');
      const colorItem = new Control(filterColorBlock.node, 'input', 'color-check', item, 'type', 'checkbox');
      new Control(filterColorBlock.node, 'label', 'color-label', item);
      colorItem.node.onclick = () => {
        const index = arrayColor.indexOf(item);
        if (index === -1) {
          arrayColor.push(item);
          state.content = {...state.content, color: [...arrayColor]};
        } else {
          arrayColor.splice(index, 1);
          state.content = {...state.content, color: [...arrayColor]};
        }
      };
    });
  }
}
