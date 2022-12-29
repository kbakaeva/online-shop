import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import './counter.scss';

export class Counter extends Control {
  counterBlock: Control<HTMLElement>;
  increment: Control<HTMLElement>;
  decrement: Control<HTMLElement>;
  counter: Control<HTMLElement>;
  total: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, item: IPhones) {
    super(parentNode, 'div', 'counter-block');
    this.counterBlock = new Control(this.node, 'div', 'counter');
    this.increment = new Control(this.counterBlock.node, 'p', 'counter__sign', '+');
    this.counter = new Control(this.counterBlock.node, 'p', 'counter__number', '1');
    this.decrement = new Control(this.counterBlock.node, 'p', 'counter__sign', '-');
    this.total = new Control(
      this.node,
      'p',
      'counter__total',
      `Итого сумма: ${+this.counter.node.textContent * item.price}`
    );
    const totalSum = JSON.parse(window.localStorage.getItem('totalSum')) || [];
    localStorage.setItem(
      'totalSum',
      JSON.stringify([...totalSum, { id: item.id, price: +this.counter.node.textContent * item.price }])
    );
    this.increment.setOnClick(() => {
      this.onIncrement(item);
    });
    this.decrement.setOnClick(() => {
      this.onDecrement(item);
    });
  }

  onIncrement = (item: IPhones) => {
    if (+this.counter.node.textContent < +item.amount) {
      this.counter.node.textContent = (+this.counter.node.textContent + 1).toString();
      if (this.total) {
        this.total.destroy();
      }
      this.total = new Control(
        this.node,
        'p',
        'counter__total',
        `Итого сумма: ${+this.counter.node.textContent * item.price} `
      );
      const totalSum = JSON.parse(window.localStorage.getItem('totalSum')) || [];

      localStorage.setItem(
        'totalSum',
        JSON.stringify([...totalSum, { id: item.id, price: +this.counter.node.textContent * item.price }])
      );
    }
  };

  onDecrement = (item: IPhones) => {
    if (+this.counter.node.textContent !== 1) {
      this.counter.node.textContent = (+this.counter.node.textContent - 1).toString();
      if (this.total) {
        this.total.destroy();
      }

      this.total = new Control(
        this.node,
        'p',
        'counter__total',
        `Итого сумма: ${+this.counter.node.textContent * item.price} `
      );
      const totalSum = JSON.parse(window.localStorage.getItem('totalSum')) || [];
      localStorage.setItem(
        'totalSum',
        JSON.stringify([...totalSum, { id: item.id, price: +this.counter.node.textContent * item.price }])
      );
    }
  };
}
