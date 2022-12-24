import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class Sort extends Control {
  sort: Control<HTMLSelectElement>;

  options: Control<HTMLOptionElement>;

  optionsRevers: Control<HTMLOptionElement>;

  camera: Control<HTMLElement>;

  amount: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'container');
    this.sort = new Control(this.node, 'select', 'sort');
    this.options = new Control(this.sort.node, 'option', 'option', 'Sort options:');
    this.options = new Control(this.sort.node, 'option', 'option', 'Sort by A-Z');
    this.optionsRevers = new Control(this.sort.node, 'option', 'option', 'Sort by Z-A');
    this.camera = new Control(this.sort.node, 'option', 'option', 'Sort by price ↑');
    this.amount = new Control(this.sort.node, 'option', 'option', 'Sort by price ↓');
    this.sort.node.onchange = () => {
      state.content = { ...state.content, sort: this.sort.node.selectedIndex };
    };
  }
}
