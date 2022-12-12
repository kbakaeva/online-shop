import Control from "../../../control/control"
import { IPhones } from "../../../interface/phones";

export default class Cards extends Control{
 title: Control<HTMLElement>;
  img: Control<HTMLElement>;
  color: Control<HTMLElement>;
  subtitle: Control<HTMLElement>;
  price: Control<HTMLElement>;
  amount: Control<HTMLElement>;
  button: Control<HTMLElement>;
 constructor(parentNode:HTMLElement, item:IPhones){
  super(parentNode, 'div', 'block-cards');
  this.title = new Control(this.node, 'div', 'card', item.name);
  this.img = new Control(this.node, 'img', 'img-card', '','src', item.image);
  this.subtitle = new Control(this.node, 'div', 'card', `Производитель: ${item.manufacturer}`);
  this.color = new Control(this.node, 'div', 'card', `Цвет: ${item.color}`);
  this.price = new Control(this.node, 'div', 'card', `Цена: ${item.price}`);
  this.amount = new Control(this.node, 'div', 'card', `Количество: ${item.amount}`);
  // this.button = new Control(this.node, 'button', 'btn', `${item.button}`);
 }
}