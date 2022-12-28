import {State} from '../../control/filterState';
import {IFilters} from '../../interface/filter';
import {IPhones} from '../../interface/phones';
import {phonesData} from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import {Sort} from './filters/sort';
import {FilterColor} from './filters/color';
import {Search} from './filters/search';
import {BrandFilter} from './filters/brand';
import RangeSliderAmount from './filters/sliderAmount';
import RangeSliderPrice from './filters/slider.Price';
import './main.scss';
import {StateBasket} from '@/control/stateBasket';
import {initialState} from '../../index';

export default class Main extends Control {
  private title: Control<HTMLElement>;
  private cards: Cards;
  private wrapper: Control<HTMLElement>;
  private sort: Sort;
  private filterColorInput: FilterColor;
  private blockSorts: Control<HTMLElement>;
  private search: Search;
  private found: Control<HTMLElement>;
  private filter: BrandFilter;
  private sliderAmount: RangeSliderAmount;
  private sliderPrice: RangeSliderPrice;

  private foundСounter: Control<HTMLElement>;

  private blockFilters: Control<HTMLElement>;
  private model: StateBasket;
  resetFilters: Control<HTMLElement>;
  copyFilters: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State, model: StateBasket) {
    super(parentNode, 'main', 'main');

    this.renderCards(phonesData);
    this.blockFilters = new Control(this.node, 'div', 'block-filters');
    this.resetFilters = new Control(this.blockFilters.node, 'button', 'reset-filters', 'Reset Filters');
    this.copyFilters = new Control(this.blockFilters.node, 'button', 'copy-link', 'Copy link');
    this.copyFilters.setOnClick(() => {
      navigator.clipboard.writeText(window.location.toString());
    });
    this.search = new Search(this.blockFilters.node, state);
    this.sort = new Sort(this.blockFilters.node, state);
    this.filterColorInput = new FilterColor(this.blockFilters.node, state);
    this.filter = new BrandFilter(this.blockFilters.node, state);
    this.sliderAmount = new RangeSliderAmount(this.blockFilters.node, state);
    this.sliderPrice = new RangeSliderPrice(this.blockFilters.node, state);
    this.foundСounter = new Control(this.blockFilters.node, 'div', 'counter', 'Found:');
    this.model = model;
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
    this.resetFilters.setOnClick(() => {
      state.setInit(initialState);
      state.onChange.add(refresh);
      refresh(state.content);
      console.log(state.content);
    });
  }

  private renderCards(item: IPhones[]) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    this.found = new Control(this.wrapper.node, 'p', 'not-found', 'no found');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(wrapper, item, () => {
        this.model.setData(item.id);
      });
      this.found.node.style.display = 'none';
    });
    if (wrapper.childNodes.length === 0) {
      this.found.node.style.display = 'block';
      this.foundСounter.node.textContent = 'Found: 0';
    }
  }

  private sortPhones(data: IPhones[], index: number) {
    if (index === 0) {
      return data;
    }
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
  private filterColor(data: IPhones[], color: string[]) {
    if (!color.length) {
      return data;
    }
    return data.filter((element) => (color.length === 0 ? element : color.includes(element.color)));
  }

  private searchPhones(data: IPhones[], search: string): IPhones[] {
    return data.filter(
      (element) =>
        element.amount.toString().toLowerCase().includes(search.toLowerCase()) ||
        element.name.toLowerCase().includes(search.toLowerCase()) ||
        element.price.toString().toLowerCase().includes(search.toLowerCase()) ||
        element.manufacturer.toLowerCase().includes(search.toLowerCase()) ||
        element.color.toLowerCase().includes(search.toLowerCase())
    );
  }

  private filterPhones(data: IPhones[], manufacturer: string[]) {
    if (!manufacturer.length) {
      return data;
    }
    return data.filter((element) =>
      manufacturer.length === 0 ? element : manufacturer.includes(element.manufacturer)
    );
  }
  private sliderPhonesAmount(data: IPhones[], value: (string | number)[]) {
    return data.filter((element) => +value[0] <= +element.amount && +value[1] >= +element.amount);
  }
  private sliderPhonesPrice(data: IPhones[], value: (string | number)[]) {
    return data.filter((element) => +value[0] <= +element.price && +value[1] >= +element.price);
  }
}
