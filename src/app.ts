import { State } from './control/filterState';
import { StateBasket } from './control/stateBasket';
import Main from './components/main/main';
import Header from './components/header/header';
import Control from './control/control';
import Basket from './components/basket/basket';

import { NotFound } from './components/page404/pageNotFound';
import { Footer } from './components/footer/footer';

export class App {
  header: Header;
  currentPage: Control<HTMLElement>;
  onHacheHandler: () => void;
  footer: Footer;
  constructor(parentNode: HTMLElement, state: State) {
    const getLocalStorage = JSON.parse(localStorage.getItem('basket')) ?? [];
    const getTotalPrice = JSON.parse(localStorage.getItem('price')) ?? 0;
    const stateBasket = new StateBasket(getLocalStorage);
    this.header = new Header(parentNode, getLocalStorage?.length, getTotalPrice);
    this.header.updateBasket(stateBasket.data.length);
    stateBasket.onUpdate = (data: number[]) => {
      this.header.updateBasket(data.length);
    };

    stateBasket.onUpdatePrice = (price: number) => {
      const path = window.location.hash.slice(1);
      this.header.totalPrices(price);
      if (path === 'basket') {
        (this.currentPage as Basket).checkCode();
      }
    };
    this.currentPage = new Main(parentNode, state, stateBasket);
    this.footer = new Footer(parentNode);
    this.onHacheHandler = () => {
      const path = window.location.hash.slice(1);
      if (path === 'main') {
        this.currentPage.destroy();
        this.currentPage = new Main(parentNode, state, stateBasket);
        this.footer.destroy();
        this.footer = new Footer(parentNode);
      }
      if (path === 'basket') {
        this.currentPage.destroy();
        this.currentPage = new Basket(parentNode, stateBasket, getTotalPrice);
        this.footer.destroy();
        this.footer = new Footer(parentNode);
      }
      if (path !== 'main' && path !== 'basket') {
        this.currentPage.destroy();
        this.currentPage = new NotFound(parentNode);
        this.footer.destroy();
        this.footer = new Footer(parentNode);
      }
    };
    window.addEventListener('hashchange', this.onHacheHandler);
  }
}
