import './main.scss';
import {State} from 'control/filterState';
import {IFilters} from 'interface/filter';
import {IPhones} from '../../interface/phones';
import {phonesData} from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import {Sort} from './filters/sort';
import {FilterColor} from './filters/color';

export default class Main extends Control {
  title: Control<HTMLElement>;

  cards: Cards;

  wrapper: Control<HTMLElement>;

  sort: Sort;

  filterColorInput: FilterColor;

  blockSorts: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'main', 'main');
    this.renderCards(phonesData);
    const blockFilters = new Control(this.node, 'div', 'block-filters');
    this.blockSorts = new Control(this.node, 'div', 'block-sort-cards');
    this.sort = new Sort(this.blockSorts.node, state);
    this.filterColorInput = new FilterColor(blockFilters.node, state);

    const refresh = (el: IFilters) => {
      let result = this.sortPhones([...phonesData], el.sort);
      result = this.filterColor(result, el.color);

      if (this.wrapper) {
        this.wrapper.destroy();
        this.renderCards(result);
      }
    };
    state.onChange.add(refresh);
    refresh(state.content);
  }

  renderCards(item: IPhones[]) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(wrapper, item);
    });
  }

  sortPhones(data: IPhones[], index: number) {
    if (index === 0) {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (index === 1) {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (index === 2) {
      return data.sort((a, b) => b.price - a.price);
    }
    if (index === 3) {
      return data.sort((a, b) => a.price - b.price);
    }
    return data;
  }
  filterColor(data: IPhones[], color: string[]) {
    return data.filter((element) => (color.length === 0 ? element : color.includes(element.color)));
  }
}
