import {State} from './control/filterState';
import Main from './components/main/main';
import Header from './components/header/header';
// import AppRoute from './control/router';
import Control from './control/control';
import Basket from './components/basket/basket';

import {StateBasket} from './control/stateBasket';
// import {initialState} from '.';

export class App {
  header: Header;
  currentPage: Control<HTMLElement>;
  onHacheHandler: () => void;
  constructor(parentNode: HTMLElement, state: State) {
    const getLocalStorage = JSON.parse(localStorage.getItem('basket')) ?? [];
    const stateBasket = new StateBasket(getLocalStorage);

    this.header = new Header(parentNode, getLocalStorage?.length);
    const main = new Main(parentNode, state, stateBasket);
    this.header.updateBasket(stateBasket.data.length);
    stateBasket.onUpdate = (data: number[]) => {
      this.header.updateBasket(data.length);
    };
    // state.onChange.remove(initialState);
    this.currentPage = main;
    // window.onstorage = (event) => {
    //   console.log(event.key);
    // };
    // window.addEventListener('storage', (e) => {
    //   console.log('asdsa', e);

    //   this.header.updateBasket(localStorage.length);
    // });

    // this.header.updateBasket(localStorage.length ?? 0);
    this.onHacheHandler = () => {
      const path = window.location.hash.slice(1);
      this.currentPage.destroy();
      if (path === 'main') {
        this.currentPage.destroy();
        this.currentPage = new Main(parentNode, state, stateBasket);
      }
      if (path === 'basket') {
        this.currentPage.destroy();
        this.currentPage = new Basket(parentNode);
      }
    };
    window.addEventListener('hashchange', this.onHacheHandler);
  }
}
