import { phonesData } from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import { IPhones } from '../../interface/phones';

export default class Basket extends Control {
  text: Control<HTMLElement> | undefined;
  cards: Cards;
  wrapper: Control<HTMLElement>;

  constructor(parentNode: HTMLElement) {
    super(parentNode, 'basket', 'basket');
    this.renderCards(phonesData);
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
}
