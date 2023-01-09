import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class Sort extends Control {
  sort: Control<HTMLSelectElement>;

  options: Control<HTMLOptionElement>;
  optionsRev: Control<HTMLOptionElement>;
  optionsRevers: Control<HTMLOptionElement>;

  camera: Control<HTMLOptionElement>;

  amount: Control<HTMLOptionElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'container');
    this.sort = new Control(this.node, 'select', 'sort');
    this.options = new Control(this.sort.node, 'option', 'option', 'Sort options:');
    this.optionsRev = new Control(this.sort.node, 'option', 'option', 'По алфавиту ↑');

    this.optionsRevers = new Control(this.sort.node, 'option', 'option', 'По алфавиту ↓');
    this.camera = new Control(this.sort.node, 'option', 'option', 'По цене ↑');
    this.amount = new Control(this.sort.node, 'option', 'option', 'По цене ↓');

    if (state.content.sort === 1) {
      this.optionsRev.node.selected = true;
    }
    if (state.content.sort === 2) {
      this.optionsRevers.node.selected = true;
    }
    if (state.content.sort === 3) {
      this.camera.node.selected = true;
    }
    if (state.content.sort === 4) {
      this.amount.node.selected = true;
    }

    this.sort.node.onchange = () => {
      state.content = { ...state.content, sort: this.sort.node.selectedIndex };
    };
  }
}
