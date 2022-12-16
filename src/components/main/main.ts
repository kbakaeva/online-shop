import './main.scss';
import {State} from 'control/filterState';
import {IFilters} from 'interface/filter';
import {IPhones} from '../../interface/phones';
import {phonesData} from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import {Sort} from './filters/sort';
import {FilterColor} from './filters/color';
import {Seach} from './filters/search';
import {BrandFilter} from './filters/brand';

export default class Main extends Control {
  title: Control<HTMLElement>;

  cards: Cards;

  wrapper: Control<HTMLElement>;

  sort: Sort;

  filterColorInput: FilterColor;

  blockSorts: Control<HTMLElement>;

  search: Seach;

  found: Control<HTMLElement>;
  filter: BrandFilter;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'main', 'main');
    this.renderCards(phonesData);
    const blockFilters = new Control(this.node, 'div', 'block-filters');
    this.search = new Seach(blockFilters.node, state, () => {
      this.wrapper.destroy();
      this.renderCards(phonesData);
    });
    this.sort = new Sort(blockFilters.node, state);
    this.filterColorInput = new FilterColor(blockFilters.node, state);
    this.filter = new BrandFilter(blockFilters.node, state);

    const refresh = (el: IFilters) => {
      let result = this.sortPhones([...phonesData], el.sort);
      result = this.filterColor(result, el.color);
      result = this.searchPhones(result, el.search);
      result = this.filterPhones(result, el.manufacturer);
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
    if (index === 1) {
      return data.sort((a, b) => a.name.localeCompare(b.name));
    }
    if (index === 2) {
      return data.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (index === 3) {
      return data.sort((a, b) => b.price - a.price);
    }
    if (index === 4) {
      return data.sort((a, b) => a.price - b.price);
    }
    return data;
  }
  filterColor(data: IPhones[], color: string[]) {
    return data.filter((element) => (color.length === 0 ? element : color.includes(element.color)));
  }

  searchPhones(data: IPhones[], search: string): IPhones[] {
    if (data.filter((element) => element.name.toLowerCase().includes(search.toLowerCase())).length === 0) {
      this.found = new Control(this.node, 'p', 'not-found', 'no found');
    }
    return data.filter((element) => element.name.toLowerCase().includes(search.toLowerCase()));
  }

  filterPhones(data: IPhones[], manufacturer: string[]) {
    return data.filter((element) =>
      manufacturer.length === 0 ? element : manufacturer.includes(element.manufacturer)
    );
  }
}
