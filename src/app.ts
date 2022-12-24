import { State } from './control/filterState';
import Main from './components/main/main';
import Header from './components/header/header';
// import AppRoute from './control/router';
import Control from './control/control';
import Basket from './components/basket/basket';

export class App {
  header: Header;
  currentPage: Control<HTMLElement>;
  onHacheHandler: () => void;
  constructor(parentNode: HTMLElement, state: State) {
    new Header(parentNode);
    const main = new Main(parentNode, state);
    this.currentPage = main;

    this.onHacheHandler = () => {
      const path = window.location.hash.slice(1);
      this.currentPage.destroy();
      if (path === 'main') {
        this.currentPage.destroy();
        this.currentPage = new Main(parentNode, state);
      }
      if (path === 'basket') {
        this.currentPage.destroy();
        this.currentPage = new Basket(parentNode);
      }
    };
    window.addEventListener('hashchange', this.onHacheHandler);
  }
}
