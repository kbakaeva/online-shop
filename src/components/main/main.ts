import  './main.scss';
import { IPhones } from "../../interface/phones";
import { phonesData } from "../../services/phones";
import Control from "../../control/control";
import Cards from "./cards/cards";

export default class Main extends Control {
  title: Control<HTMLElement>;
  cards: Cards;
  wrapper: Control<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'main', 'main')
    this.renderCards(phonesData)
  }
  renderCards(item: Array<IPhones>) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(wrapper, item)
    });
  }
  
}