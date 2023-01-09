import { phonesData } from '../../services/phones';
import { IPhones } from '../../interface/phones';
import { StateBasket } from '../../control/stateBasket';
import Control from '../../control/control';
import Cards from './cards/cards';
import Popup from './popup';
import './basket.scss';

export default class Basket extends Control {
  cards: Cards;
  wrapper: Control<HTMLElement>;
  discountBlock: Control<HTMLElement>;
  summ: Control<HTMLElement>;
  inputRow: Control<HTMLElement>;
  text: Control<HTMLElement> | undefined;
  code: Control<HTMLInputElement>;
  result: Control<HTMLElement>;
  checkout: Control<HTMLElement>;
  check: Control<HTMLElement>;
  codeWord: string;
  basket: StateBasket;
  pagination: Control<HTMLSelectElement>;
  optionsTwo: Control<HTMLOptionElement>;
  optionsFour: Control<HTMLOptionElement>;
  optionsAll: Control<HTMLOptionElement>;
  page: Control<HTMLElement>;
  pageTitle: Control<HTMLElement>;
  popup: Popup;

  constructor(parentNode: HTMLElement, basket: StateBasket, total: number) {
    super(parentNode, 'basket', 'basket');
    this.codeWord = 'RSSCode';
    this.basket = basket;
    this.discountBlock = new Control(this.node, 'div', 'discount');
    this.inputRow = new Control(this.discountBlock.node, 'div', 'input-row');
    this.text = new Control(this.inputRow.node, 'p', 'discount__title', 'Ваш купон:');
    this.code = new Control(this.inputRow.node, 'input', 'discount__input');
    this.result = new Control(this.discountBlock.node, 'p', 'discount__title', `К оплате: $${total}$`);
    this.check = new Control(this.discountBlock.node, 'button', 'discount__check', 'Проверить купон - RSSCode');
    this.checkout = new Control(this.discountBlock.node, 'button', 'discount__btn', 'Оформить заказ');
    this.pagination = new Control(this.discountBlock.node, 'div', 'pagination', 'Пагинация:');
    this.optionsTwo = new Control(this.pagination.node, 'button', 'pagination__title', '2');
    this.optionsFour = new Control(this.pagination.node, 'button', 'pagination__title', '4');
    this.optionsAll = new Control(this.pagination.node, 'button', 'pagination__title', 'Все');
    const length = JSON.parse(window.localStorage.getItem('basket')).length;
    this.renderCards(phonesData, length);
    this.optionsFour.setOnClick(() => {
      this.page.destroy();
      this.renderCards(phonesData, 4);
    });
    this.optionsTwo.setOnClick(() => {
      this.page.destroy();
      this.renderCards(phonesData, 2);
    });

    this.optionsAll.setOnClick(() => {
      this.page.destroy();
      this.renderCards(phonesData, length);
    });
    this.totalPrices();
    this.check.setOnClick(() => {
      this.checkCode();
    });
    this.checkout.setOnClick(() => {
      document.body.classList.add('no-scroll');
      this.popup = new Popup(this.node, this.wrapper.node, basket);
    });
  }

  renderCards(item: IPhones[], length: number) {
    const itemId = JSON.parse(window.localStorage.getItem('basket'));
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    {
      itemId.map(
        (el: number, ind: number) =>
          ind < length &&
          item.forEach((item) => {
            if (el === item.id) {
              this.cards = new Cards(wrapper, item, this.basket);
            }
          })
      );
    }
    const count = Math.ceil(itemId.length / length);
    this.page = new Control(this.discountBlock.node, 'div', 'pagination-page', 'Страницы:');
    for (let i = 1; i <= count; i++) {
      this.pageTitle = new Control(this.page.node, 'button', 'pagination-page__title', `${i}`);
    }
  }

  totalPrices() {
    const totalLocal = localStorage.getItem('price');
    if (this.result) {
      this.result.node.textContent = `К оплате: $${totalLocal}`;
    }
  }

  checkCode = () => {
    const totalLocal = localStorage.getItem('price');
    if (this.code.node.value === this.codeWord) {
      this.result.node.textContent = `К оплате: $${+totalLocal - +totalLocal * 0.1} `;
    } else {
      this.result.node.textContent = `К оплате: $${totalLocal} `;
    }
  };
  destroyBasket() {
    this.destroy();
  }
}
