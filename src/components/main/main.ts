import { State } from '../../control/filterState';
import { IFilters } from '../../interface/filter';
import { IPhones } from '../../interface/phones';
import { phonesData } from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import { Sort } from './filters/sort';
import { FilterColor } from './filters/color';
import { Seach } from './filters/search';
import { BrandFilter } from './filters/brand';
import RangeSliderAmount from './filters/sliderAmount';
import RangeSliderPrice from './filters/slider.Price';
import './main.scss';

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
  sliderAmount: RangeSliderAmount;
  sliderPrice: RangeSliderPrice;

  foundСounter: Control<HTMLElement>;

  blockFilters: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'main', 'main');
    this.renderCards(phonesData);
    this.blockFilters = new Control(this.node, 'div', 'block-filters');
    this.search = new Seach(this.blockFilters.node, state);
    this.sort = new Sort(this.blockFilters.node, state);
    this.filterColorInput = new FilterColor(this.blockFilters.node, state);
    this.filter = new BrandFilter(this.blockFilters.node, state);
    this.sliderAmount = new RangeSliderAmount(this.blockFilters.node, state);
    this.sliderPrice = new RangeSliderPrice(this.blockFilters.node, state);
    this.foundСounter = new Control(this.blockFilters.node, 'div', 'counter', 'Found:');

    const refresh = (el: IFilters) => {
      let result = this.sortPhones([...phonesData], el.sort);
      result = this.filterColor(result, el.color);
      result = this.searchPhones(result, el.search);
      result = this.filterPhones(result, el.manufacturer);
      result = this.sliderPhonesAmount(result, el.amount);
      result = this.sliderPhonesPrice(result, el.price);

      if (this.wrapper) {
        this.wrapper.destroy();
        this.foundСounter.destroy();
        this.renderCards(result);
        const wrapperLength: string = (this.wrapper.node.childNodes.length - 1).toString();
        this.foundСounter = new Control(this.blockFilters.node, 'div', 'counter', 'Found:');
        this.foundСounter.node.textContent = `Found: ${Number(wrapperLength)}`;
      }
    };
    state.onChange.add(refresh);

    refresh(state.content);
  }

  renderCards(item: IPhones[]) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    this.found = new Control(this.wrapper.node, 'p', 'not-found', 'no found');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(wrapper, item);
      this.found.node.style.display = 'none';
    });
    if (wrapper.childNodes.length === 0) {
      this.found.node.style.display = 'block';
      this.foundСounter.node.textContent = 'Found: 0';
    }
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
    return data.filter(
      (element) =>
        element.amount.toString().toLowerCase().includes(search.toLowerCase()) ||
        element.name.toLowerCase().includes(search.toLowerCase()) ||
        element.price.toString().toLowerCase().includes(search.toLowerCase()) ||
        element.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        element.color.toLowerCase().includes(search.toLowerCase())
    );
  }

  filterPhones(data: IPhones[], manufacturer: string[]) {
    return data.filter((element) =>
      manufacturer.length === 0 ? element : manufacturer.includes(element.manufacturer)
    );
  }
  sliderPhonesAmount(data: IPhones[], value: (string | number)[]) {
    return data.filter((element) => +value[0] <= +element.amount && +value[1] >= +element.amount);
  }
  sliderPhonesPrice(data: IPhones[], value: (string | number)[]) {
    return data.filter((element) => +value[0] <= +element.price && +value[1] >= +element.price);
  }
}
