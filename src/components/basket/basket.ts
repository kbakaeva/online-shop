import { phonesData } from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import { IPhones } from '../../interface/phones';
import './basket.scss';
type up = (date: number) => void;

export default class Basket extends Control {
  cards: Cards;
  wrapper: Control<HTMLElement>;
  discountBlock: Control<HTMLElement>;
  summ: Control<HTMLElement>;
  inputRow: Control<HTMLElement>;
  text: Control<HTMLElement> | undefined;
  code: Control<HTMLElement>;
  result: Control<HTMLElement>;
  totalSum: number[];
  onUpdate!: up;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'basket', 'basket');
    this.discountBlock = new Control(this.node, 'div', 'discount');
    this.summ = new Control(this.discountBlock.node, 'p', 'discount__title', `Общая сумма: ${0} $`);
    this.inputRow = new Control(this.discountBlock.node, 'div', 'input-row');
    this.text = new Control(this.inputRow.node, 'p', 'discount__title', 'Ваш купон:');
    this.code = new Control(this.inputRow.node, 'input', 'discount__input');
    this.result = new Control(this.discountBlock.node, 'p', 'discount__title', `К оплате: ${0} $`);
    this.renderCards(phonesData);
    this.updateSum();
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

  updateSum() {
    const totalSum = JSON.parse(window.localStorage.getItem('totalSum'));
    // this.onUpdate(totalSum);
    console.log('totalSum', totalSum);
    const sum = [...new Map(totalSum.map((item: Record<string, number>) => [item['id'], item])).values()].reduce(
      (t: number, el: Record<string, number>) => t + el.price,
      0
    );
    this.summ.node.textContent = String(sum);
  }
}
