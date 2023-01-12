import { StateBasket } from '../../../control/stateBasket';
import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import './cards.scss';

export default class Cards extends Control {
  title: Control<HTMLElement>;
  img: Control<HTMLElement>;
  color: Control<HTMLElement>;
  subtitle: Control<HTMLElement>;
  amount: Control<HTMLElement>;
  counter: Control<HTMLElement>;
  price: Control<HTMLElement>;
  counterBlock: Control<HTMLElement>;
  increment: Control<HTMLElement>;
  decrement: Control<HTMLElement>;
  count: Control<HTMLElement>;
  basket: StateBasket;

  constructor(parentNode: HTMLElement, item: IPhones, basket: StateBasket) {
    super(parentNode, 'div', 'block-cards');
    this.title = new Control(this.node, 'div', 'card__name', item.name);
    this.img = new Control(this.node, 'img', 'img-card', '', 'src', item.image);
    this.subtitle = new Control(this.node, 'div', 'card', `Производитель: ${item.manufacturer}`);
    this.color = new Control(this.node, 'div', 'card', `Цвет: ${item.color}`);
    this.amount = new Control(this.node, 'div', 'card', `На складе: ${item.amount}`);
    this.price = new Control(this.node, 'div', 'card', `Стоимость: $${item.price}`);
    this.counter = new Control(this.node, 'div', 'counter-block');
    this.counterBlock = new Control(this.counter.node, 'div', 'counter');
    this.increment = new Control(this.counterBlock.node, 'p', 'counter__sign', '+');
    this.count = new Control(this.counterBlock.node, 'p', 'counter__number', '1');
    this.decrement = new Control(this.counterBlock.node, 'p', 'counter__sign', '-');
    this.basket = basket;
    this.increment.setOnClick(() => {
      this.onIncrement(item);
    });
    this.decrement.setOnClick(() => {
      this.onDecrement(item);
    });
  }

  onIncrement = (item: IPhones) => {
    if (+(this.count.node.textContent || 0) < +item.amount) {
      this.count.node.textContent = (+(this.count.node.textContent || 0) + 1).toString();
      this.basket.setPrice(item.price);
    }
  };

  onDecrement = (item: IPhones) => {
    if (+(this.count.node.textContent || 0) !== 1) {
      this.count.node.textContent = (+(this.count.node.textContent || 0) - 1).toString();
      this.basket.setPrice(item.price, false);
    }
  };
}
