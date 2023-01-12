import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class Search extends Control {
  input: Control<HTMLInputElement>;
  cross: Control<HTMLInputElement> | undefined;
  lineCrossOne: Control<HTMLElement> | undefined;
  lineCrossTwo: Control<HTMLElement> | undefined;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'search-container');
    this.input = new Control(this.node, 'input', 'search');
    const cross = new Control(this.node, 'div', 'cross');
    cross.setOnClick(() => {
      state.content = { ...state.content, search: (this.input.node.value = '') };
    });
    if (state.content.search) {
      this.input.node.value = state.content.search;
    }
    this.input.node.placeholder = 'Search';
    this.input.node.oninput = () => {
      state.content = { ...state.content, search: this.input.node.value.trim() };
    };
  }
}
