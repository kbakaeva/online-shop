import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class FilterColor extends Control {
  color: Control<HTMLElement>;
  blockColor: Control<HTMLElement>;
  colorItem: Control<HTMLInputElement> | undefined;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'color');
    const color = ['purple', 'black', 'red', 'white', 'orange', 'blue', 'silver', 'green'];
    const arrayColor: string[] = [];
    this.blockColor = new Control(this.node, 'div', 'color-content');
    this.color = new Control(this.blockColor.node, 'h3', 'color-title', 'Color');
    color.forEach((item) => {
      const filterColorBlock = new Control(this.node, 'div', 'color-block');
      this.colorItem = new Control(filterColorBlock.node, 'input', 'color-check', item, 'type', 'checkbox');
      if (state.content.color.includes(item)) {
        this.colorItem.node.checked = true;
      }

      new Control(filterColorBlock.node, 'label', 'color-label', item);

      this.colorItem.node.onclick = () => {
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
