import { State } from './control/filterState';
import { StateBasket } from './control/stateBasket';
import Main from './components/main/main';
import Header from './components/header/header';
import Basket from './components/basket/basket';
import Control from './control/control';

export class App {
  header: Header;
  currentPage: Control<HTMLElement>;
  onHacheHandler: () => void;
  constructor(parentNode: HTMLElement, state: State) {
    const getLocalStorage = JSON.parse(localStorage.getItem('basket')) ?? [];
    const getTotalPrice = JSON.parse(localStorage.getItem('price')) ?? 0;
    const stateBasket = new StateBasket(getLocalStorage);
    this.header = new Header(parentNode, getLocalStorage?.length, getTotalPrice);
    const main = new Main(parentNode, state, stateBasket);
    this.header.updateBasket(stateBasket.data.length);
    stateBasket.onUpdate = (data: number[]) => {
      this.header.updateBasket(data.length);
    };

    stateBasket.onUpdatePrice = (price: number) => {
      const path = window.location.hash.slice(1);
      this.header.totalPrices(price);
      if (path === 'basket') {
        (this.currentPage as Basket).checkCode(price);
      }
    };
    this.currentPage = main;
    this.onHacheHandler = () => {
      const path = window.location.hash.slice(1);
      this.currentPage.destroy();
      if (path === 'main') {
        this.currentPage.destroy();
        this.currentPage = new Main(parentNode, state, stateBasket);
      }
      if (path === 'basket') {
        this.currentPage.destroy();
        this.currentPage = new Basket(parentNode, stateBasket, getTotalPrice);
      }
    };
    window.addEventListener('hashchange', this.onHacheHandler);
  }
}
