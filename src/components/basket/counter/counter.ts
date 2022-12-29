import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import './counter.scss';

export class Counter extends Control {
  increment: Control<HTMLElement>;
  decrement: Control<HTMLElement>;
  counter: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, item: IPhones) {
    super(parentNode, 'div', 'counter');
    this.increment = new Control(this.node, 'p', 'counter__sign', '+');
    this.counter = new Control(this.node, 'p', 'counter__number', '0');
    this.decrement = new Control(this.node, 'p', 'counter__sign', '-');
    this.increment.setOnClick(() => {
      if (+this.counter.node.textContent < +item.amount) {
        this.counter.node.textContent = (+this.counter.node.textContent + 1).toString();
      }
    });
    this.decrement.setOnClick(() => {
      if (+this.counter.node.textContent !== 0) {
        this.counter.node.textContent = (+this.counter.node.textContent - 1).toString();
      }
    });
  }
}
