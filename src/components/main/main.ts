import  './main.scss';
import { IPhones } from "../../interface/phones";
import { phonesData } from "../../services/phones";
import Control from "../../control/control";
import Cards from "./cards/cards";
import { State } from 'control/state';
import { Sort } from './filters/sort';
import { IFilters } from 'interface/filter';

export default class Main extends Control {
  title: Control<HTMLElement>;
  cards: Cards;
  wrapper: Control<HTMLElement>;
  sort: Sort;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'main', 'main')
    this.renderCards(phonesData)
    const blockFilters = new Control(this.node, 'div', 'blockFilters');
    this.sort = new Sort(blockFilters.node, state);

    const refresh = (el: IFilters) => {
      const result = this.sortPhones([...phonesData], el.sort);

      if (this.wrapper) {
        this.wrapper.destroy();
        this.renderCards(result);
      }
    };
    state.onChange.add(refresh);
    refresh(state.content);
  }
  renderCards(item: Array<IPhones>) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(wrapper, item)
    });
  }
  sortPhones(data: Array<IPhones>, index: number) {
    if (index === 0) {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    } else if (index === 1) {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }else if (index === 2) {
      return data.sort((a, b) => b.price - a.price);
    }else if (index === 3) {
      return data.sort((a, b) => a.price - b.price);
    }
    return data;
  }
}