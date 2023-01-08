import { phonesData } from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import { IPhones } from '../../interface/phones';
import './basket.scss';
import Popup from './popup';
// import { totalSum } from '@/control/totalSum';

// type up = (date: number) => void;

export default class Basket extends Control {
  cards: Cards;
  wrapper: Control<HTMLElement>;
  discountBlock: Control<HTMLElement>;
  summ: Control<HTMLElement>;
  inputRow: Control<HTMLElement>;
  text: Control<HTMLElement> | undefined;
  code: Control<HTMLElement>;
  result: Control<HTMLElement>;
  checkout: Control<HTMLElement>;
  asd: Control<HTMLElement>;
  button: Control<HTMLElement>;
  modal: Control<HTMLElement>;
  popup: Popup;
  // totalSum: any;
  // totalSum: number[];
  // onUpdate!: up;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'basket');
    this.discountBlock = new Control(this.node, 'div', 'discount');
    this.inputRow = new Control(this.discountBlock.node, 'div', 'input-row');
    this.text = new Control(this.inputRow.node, 'p', 'discount__title', 'Ваш купон:');
    this.code = new Control(this.inputRow.node, 'input', 'discount__input');
    this.result = new Control(this.discountBlock.node, 'p', 'discount__title', `К оплате: ${0} $`);
    this.checkout = new Control(this.discountBlock.node, 'button', 'discount__btn', 'Оформить заказ');
    this.renderCards(phonesData);
    // this.updateSum();
    // this.updateSum();
    console.log(this.wrapper.node);

    // this.button = new Control(this.discountBlock.node, 'button', 'button-popup', 'Оформить заказ');
    this.checkout.setOnClick(() => {
      document.body.classList.add('no-scroll');
      this.popup = new Popup(this.node, this.wrapper.node);
    });
  }

  renderCards(item: IPhones[]) {
    const itemId = JSON.parse(window.localStorage.getItem('basket'));
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    itemId.map((el: number) => {
      item.forEach((item) => {
        if (el === item.id) {
          this.cards = new Cards(wrapper, item);
        }
      });
    });
  }

  // updateSum() {
  //   const totalSum = JSON.parse(window.localStorage.getItem('totalSum'));
  //   const sum = [...new Map(totalSum.map((item: Record<string, number>) => [item['id'], item])).values()].reduce(
  //     (t: number, el: Record<string, number>) => t + el.price,
  //     0
  //   );

  //   this.summ.node.textContent = String(sum);
  // }
  //   this.summ.node.textContent = String(sum);
  // }
  destroyBasket() {
    this.destroy();
  }
}
