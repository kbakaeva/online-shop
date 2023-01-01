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

  constructor(parentNode: HTMLElement, item: IPhones) {
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

    const totalSum = JSON.parse(window.localStorage.getItem('totalSum')) || [];
    localStorage.setItem(
      'totalSum',
      JSON.stringify([...totalSum, { id: item.id, price: +this.counter.node.textContent * item.price }])
    );

    this.increment.setOnClick(() => {
      this.onIncrement(item);
    });
    this.decrement.setOnClick(() => {
      this.onDecrement();
    });
  }
  onIncrement(item: IPhones) {
    if (+this.counter.node.textContent < +item.amount) {
      this.counter.node.textContent = (+this.counter.node.textContent + 1).toString();
    }
  }

  onDecrement() {
    if (+this.counter.node.textContent !== 1) {
      this.counter.node.textContent = (+this.counter.node.textContent - 1).toString();
    }
  }
}
