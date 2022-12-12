import Control from '../../../control/control';
import { State } from '../../../control/state';

export class Sort extends Control {
  sort: Control<HTMLSelectElement>;
  options: Control<HTMLOptionElement>;
  optionsRevers: Control<HTMLOptionElement>;
  camera: Control<HTMLElement>;
  amount: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'container');
    this.sort = new Control(this.node, 'select', 'sort');
    this.options = new Control(this.sort.node, 'option', 'option', 'Сортировка по A-Z');
    this.optionsRevers = new Control(this.sort.node, 'option', 'option', 'Сортировка по Z-A');
    this.camera = new Control(this.sort.node, 'option', 'option', 'По цене ↑');
    this.amount = new Control(this.sort.node, 'option', 'option', 'По цене ↓');
    this.sort.node.onchange = () => {
      state.content = { ...state.content, sort: this.sort.node.selectedIndex };
    };
  }
}
