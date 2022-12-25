import { State } from './control/filterState';
import Main from './components/main/main';
import Header from './components/header/header';
// import AppRoute from './control/router';
import Control from './control/control';
import Basket from './components/basket/basket';

import { StateBasket } from './control/stateBasket';

export class App {
  header: Header;
  currentPage: Control<HTMLElement>;
  onHacheHandler: () => void;
  constructor(parentNode: HTMLElement, state: State) {
    this.header = new Header(parentNode, localStorage.length);
    const stateBasket = new StateBasket([]);
    const main = new Main(parentNode, state, stateBasket);
    this.header.updateBasket(stateBasket.data.length ?? 0);
    stateBasket.onUpdate = (data: number[]) => {
      this.header.updateBasket(data.length);
    };
    this.currentPage = main;
    // console.log(localStorage.length);
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

// npm i -D gh-pages
// "deploy": "npm run build && npx gh-pages -d dist -e migration-newip-to-ts"
// npm run deploy -e online-shop вытащить из диста файлы и перекинет их в папку online-shop
// -e команда которая создаст папку
