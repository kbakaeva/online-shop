import Control from '../../control/control';
import './header.scss';

export default class Header extends Control {
  image: Control<HTMLImageElement>;
  text: Control<HTMLElement> | undefined;
  main: Control<HTMLElement>;
  clearHash: Control<HTMLElement>;
  textShop: Control<HTMLElement>;
  totalSum: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, localstor: number, totalPrice: number) {
    super(parentNode, 'header', 'header');
    this.textShop = new Control(this.node, 'h1', 'header__online-shop', 'Online-shop');
    this.totalSum = new Control(this.node, 'p', 'header__total-sum', `Общая сумма: ${0}`);
    this.main = new Control(this.node, 'div', 'header__block-basket');
    this.clearHash = new Control(this.main.node, 'button', 'header__clear-hash', 'Очистить');
    this.image = new Control(this.main.node, 'div', 'header__basket');
    this.image.node.innerHTML =
      '<svg _ngcontent-sgs-c147="" width="22" height="21" viewBox="0 0 22 21" fill="#fff" xmlns="http://www.w3.org/2000/svg" class="ng-tns-c147-0"><path _ngcontent-sgs-c147="" d="M20.5827 5.92461C20.3262 5.81464 20.0364 5.81108 19.7772 5.91472C19.518 6.01835 19.3106 6.2207 19.2006 6.47724L16.3164 13.2078H7.45219L6.48376 1.54144C6.4618 1.27768 6.34127 1.03187 6.14619 0.852981C5.95112 0.674095 5.69581 0.575265 5.43113 0.576178H1.2206C0.941426 0.576178 0.673685 0.68708 0.476278 0.884487C0.278871 1.08189 0.167969 1.34964 0.167969 1.62881C0.167969 1.90799 0.278871 2.17573 0.476278 2.37313C0.673685 2.57054 0.941426 2.68144 1.2206 2.68144H4.46271L5.43113 14.3478C5.4531 14.6115 5.57363 14.8574 5.7687 15.0362C5.96378 15.2151 6.21909 15.314 6.48376 15.313H17.0101C17.2161 15.313 17.4175 15.2526 17.5894 15.1392C17.7614 15.0258 17.8963 14.8645 17.9775 14.6751L21.1354 7.30671C21.2453 7.05015 21.2489 6.76041 21.1452 6.50122C21.0416 6.24203 20.8393 6.03462 20.5827 5.92461Z" fill="#fff" class="ng-tns-c147-0"></path><path _ngcontent-sgs-c147="" d="M7.00967 20.5762C7.8817 20.5762 8.58862 19.8693 8.58862 18.9972C8.58862 18.1252 7.8817 17.4183 7.00967 17.4183C6.13764 17.4183 5.43073 18.1252 5.43073 18.9972C5.43073 19.8693 6.13764 20.5762 7.00967 20.5762Z" fill="#fff" class="ng-tns-c147-0"></path><path _ngcontent-sgs-c147="" d="M16.4842 20.5762C17.3562 20.5762 18.0631 19.8693 18.0631 18.9972C18.0631 18.1252 17.3562 17.4183 16.4842 17.4183C15.6121 17.4183 14.9052 18.1252 14.9052 18.9972C14.9052 19.8693 15.6121 20.5762 16.4842 20.5762Z" fill="#fff" class="ng-tns-c147-0"></path></svg>';
    this.text = new Control(this.main.node, 'div', 'header__text', `${localstor.toString()}`);
    this.textShop.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'main';
    });
    this.image.setOnClick(() => {
      window.location.hash = '';
      window.location.hash = 'basket';
    });
    this.updateBasket(localstor);
    this.totalPrices(totalPrice);
  }

  updateBasket(local: number) {
    if (this.text) {
      this.text.node.textContent = local.toString();
    }
  }

  totalPrices(price: number) {
    if (this.text) {
      this.totalSum.node.textContent = `Общая сумма: ${price.toString()}`;
    }
  }
}
