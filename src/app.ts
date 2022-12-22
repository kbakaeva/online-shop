import {State} from './control/filterState';
import Main from './components/main/main';
import Header from './components/header/header';

export class App {
  header: Header;
  constructor(parentNode: HTMLElement, state: State) {
    new Header(parentNode);
    new Main(parentNode, state);
  }
}
