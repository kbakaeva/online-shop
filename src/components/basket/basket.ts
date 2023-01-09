import { phonesData } from '../../services/phones';
import { IPhones } from '../../interface/phones';
import { StateBasket } from '../../control/stateBasket';
import Control from '../../control/control';
import Cards from './cards/cards';
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
  constructor(parentNode: HTMLElement, basket: StateBasket, total: number) {
    super(parentNode, 'basket', 'basket');
    this.codeWord = 'RSSCode';
    this.basket = basket;
    this.discountBlock = new Control(this.node, 'div', 'discount');
    this.inputRow = new Control(this.discountBlock.node, 'div', 'input-row');
    this.text = new Control(this.inputRow.node, 'p', 'discount__title', 'Ваш купон:');
    this.code = new Control(this.inputRow.node, 'input', 'discount__input');
    this.result = new Control(this.discountBlock.node, 'p', 'discount__title', `К оплате: $${total}$`);
    this.check = new Control(this.discountBlock.node, 'button', 'discount__check', 'Проверить купон');
    this.checkout = new Control(this.discountBlock.node, 'button', 'discount__btn', 'Оформить заказ');
    this.renderCards(phonesData);
    this.totalPrices();

    this.check.setOnClick(() => {
      this.checkCode();
    });
  }

  renderCards(item: IPhones[]) {
    const itemId = JSON.parse(window.localStorage.getItem('basket'));
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    itemId.map((el: number) => {
      item.forEach((item) => {
        if (el === item.id) {
          this.cards = new Cards(wrapper, item, this.basket);
        }
      });
    });
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
}
