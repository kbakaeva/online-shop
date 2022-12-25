import './cards.scss';
import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import { Counter } from '../counter/counter';

export default class Cards extends Control {
  title: Control<HTMLElement>;
  img: Control<HTMLElement>;
  color: Control<HTMLElement>;
  subtitle: Control<HTMLElement>;
  price: Control<HTMLElement>;
  amount: Control<HTMLElement>;
  counter: Counter;

  constructor(parentNode: HTMLElement, item: IPhones) {
    super(parentNode, 'div', 'block-cards');
    this.title = new Control(this.node, 'div', 'card__name', item.name);
    this.img = new Control(this.node, 'img', 'img-card', '', 'src', item.image);
    this.subtitle = new Control(this.node, 'div', 'card', `Производитель: ${item.manufacturer}`);
    this.color = new Control(this.node, 'div', 'card', `Цвет: ${item.color}`);
    this.price = new Control(this.node, 'div', 'card', `Цена: ${item.price}`);
    this.amount = new Control(this.node, 'div', 'card', `Количество: ${item.amount}`);
    this.counter = new Counter(this.node, item);
  }
}
