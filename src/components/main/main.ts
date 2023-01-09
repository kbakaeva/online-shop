import { State } from '../../control/filterState';
import { IFilters } from '../../interface/filter';
import { IPhones } from '../../interface/phones';
import { phonesData } from '../../services/phones';
import Control from '../../control/control';
import Cards from './cards/cards';
import { Sort } from './filters/sort';
import { FilterColor } from './filters/color';
import { Search } from './filters/search';
import { BrandFilter } from './filters/brand';
import RangeSliderAmount from './filters/sliderAmount';
import RangeSliderPrice from './filters/slider.Price';
import './main.scss';
import { initialState } from '../../index';
import { StateBasket } from '@/control/stateBasket';
import { CardInfo } from './cardInfo/cardInfo';

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
  private resetFilters: Control<HTMLElement>;
  private copyFilters: Control<HTMLElement>;
  private sortLine: Control<HTMLElement>;
  private sortCoub: Control<HTMLElement>;
  dataCount: number = phonesData.length;

  constructor(parentNode: HTMLElement, state: State, model: StateBasket) {
    super(parentNode, 'main', 'main');
    this.renderCards(phonesData, state);
    this.blockFilters = new Control(this.node, 'div', 'block-filters');
    this.renderFilters(this.blockFilters.node, state);

    this.model = model;

    const refresh = (el: IFilters) => {
      let result = this.sortPhones([...phonesData], el.sort);
      result = this.filterColor(result, el.color);
      result = this.searchPhones(result, el.search);
      result = this.filterPhones(result, el.manufacturer);
      result = this.sliderPhonesAmount(result, el.amount);
      result = this.sliderPhonesPrice(result, el.price);
      this.dataCount = result.length;
      if (this.wrapper) {
        this.wrapper.destroy();
        this.foundСounter?.destroy();
        this.renderCards(result, state);

        const location = window.location.href;
        if (location.split('&').indexOf('button=line') === -1) {
          this.wrapper.node.classList.remove('wrapper-line');
          this.wrapper.node.classList.add('wrapper-coub');
        } else {
          this.wrapper.node.classList.remove('wrapper-coub');
          this.wrapper.node.classList.add('wrapper-line');
        }
        this.sortLine.setOnClick(() => {
          state.content = { ...state.content, button: ['line'] };
          this.wrapper.node.classList.add('wrapper-line');
          this.wrapper.node.classList.remove('wrapper-coub');
        });
        this.sortCoub.setOnClick(() => {
          state.content = { ...state.content, button: ['coub'] };
          this.wrapper.node.classList.remove('wrapper-line');
          this.wrapper.node.classList.add('wrapper-coub');
        });
        this.foundСounter = new Control(this.blockFilters.node, 'div', 'counter', `Found: ${this.dataCount}`);
      }
    };
    state.onChange.add(refresh);
    refresh(state.content);
  }
  private renderFilters(blockFilters: HTMLElement, state: State) {
    const resCopy = new Control(blockFilters, 'div', 'res-copy');
    this.resetFilters = new Control(resCopy.node, 'button', 'reset-filters', 'Reset Filters');
    this.copyFilters = new Control(resCopy.node, 'button', 'copy-link', 'Copy link');
    this.resetFilters.setOnClick(() => {
      state.content = { ...initialState };
      this.blockFilters.destroy();
      this.blockFilters = new Control(this.node, 'div', 'block-filters');
      const blockFilters = this.blockFilters.node;
      this.renderFilters(blockFilters, state);
    });
    this.copyFilters.setOnClick(() => {
      navigator.clipboard.writeText(window.location.href);
      this.copyFilters.node.textContent = 'Copied';
    });
    const lineCoub = new Control(blockFilters, 'div', 'line-coub');
    this.sortLine = new Control(lineCoub.node, 'button', 'line', 'line');
    this.sortLine.node.innerHTML = `<svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M2.91 1.455c-.804 0-1.456.65-1.456 1.454v1.455c0 .804.652 1.455 1.455 1.455H13c.803 0 1.455-.651 1.455-1.455V2.91c0-.803-.652-1.454-1.455-1.454H2.91ZM0 2.909A2.91 2.91 0 0 1 2.91 0H13a2.91 2.91 0 0 1 2.91 2.91v1.454A2.91 2.91 0 0 1 13 7.274H2.91A2.91 2.91 0 0 1 0 4.364V2.91Zm2.91 7.272c-.804 0-1.456.651-1.456 1.455v1.455c0 .803.652 1.455 1.455 1.455H13c.803 0 1.455-.652 1.455-1.455v-1.455c0-.804-.652-1.455-1.455-1.455H2.91ZM0 11.636a2.91 2.91 0 0 1 2.91-2.91H13a2.91 2.91 0 0 1 2.91 2.91v1.455A2.91 2.91 0 0 1 13 16H2.91A2.91 2.91 0 0 1 0 13.09v-1.454Z' fill='#333'/></svg>`;
    this.sortCoub = new Control(lineCoub.node, 'button', 'coub', 'coub');
    this.sortCoub.node.innerHTML = `<svg width='16' height='16' fill='none' xmlns='http://www.w3.org/2000/svg'><path fill-rule='evenodd' clip-rule='evenodd' d='M2.91 1.455c-.804 0-1.456.65-1.456 1.454v1.455c0 .804.652 1.455 1.455 1.455h1.455c.803 0 1.454-.651 1.454-1.455V2.91c0-.803-.65-1.454-1.454-1.454H2.909ZM0 2.909A2.91 2.91 0 0 1 2.91 0h1.454a2.91 2.91 0 0 1 2.909 2.91v1.454a2.91 2.91 0 0 1-2.91 2.91H2.91A2.91 2.91 0 0 1 0 4.364V2.91Zm11.636-1.454c-.803 0-1.454.65-1.454 1.454v1.455c0 .804.65 1.455 1.454 1.455h1.455c.803 0 1.455-.651 1.455-1.455V2.91c0-.803-.652-1.454-1.455-1.454h-1.455ZM8.727 2.909A2.91 2.91 0 0 1 11.637 0h1.454A2.91 2.91 0 0 1 16 2.91v1.454a2.91 2.91 0 0 1-2.91 2.91h-1.454a2.91 2.91 0 0 1-2.909-2.91V2.91ZM2.91 10.181c-.803 0-1.455.651-1.455 1.455v1.455c0 .803.652 1.455 1.455 1.455h1.455c.803 0 1.454-.652 1.454-1.455v-1.455c0-.804-.65-1.455-1.454-1.455H2.909ZM0 11.636a2.91 2.91 0 0 1 2.91-2.91h1.454a2.91 2.91 0 0 1 2.909 2.91v1.455A2.91 2.91 0 0 1 4.363 16H2.91A2.91 2.91 0 0 1 0 13.09v-1.454Zm11.636-1.455c-.803 0-1.454.651-1.454 1.455v1.455c0 .803.65 1.455 1.454 1.455h1.455c.803 0 1.455-.652 1.455-1.455v-1.455c0-.804-.652-1.455-1.455-1.455h-1.455Zm-2.909 1.455a2.91 2.91 0 0 1 2.91-2.91h1.454A2.91 2.91 0 0 1 16 11.636v1.455A2.91 2.91 0 0 1 13.09 16h-1.454a2.91 2.91 0 0 1-2.909-2.91v-1.454Z' fill='#333'/></svg>`;

    this.search = new Search(blockFilters, state);
    this.sort = new Sort(blockFilters, state);
    this.filterColorInput = new FilterColor(blockFilters, state);
    this.filter = new BrandFilter(blockFilters, state);
    this.sliderAmount = new RangeSliderAmount(blockFilters, state);
    this.sliderPrice = new RangeSliderPrice(blockFilters, state);
  }
  private renderCards(item: IPhones[], state: State) {
    this.wrapper = new Control(this.node, 'div', 'wrapper');
    this.found = new Control(this.wrapper.node, 'p', 'not-found', 'no found');
    const wrapper = this.wrapper.node;
    item.forEach((item) => {
      this.cards = new Cards(
        wrapper,
        item,
        () => this.model.setData(item.id),
        () => {
          state.content = { ...initialState, brand: [item.name, `id${item.id.toString()}`] };
          this.blockFilters.destroy();
          this.wrapper.destroy();
          this.wrapper = new Control(this.node, 'div', 'wrapper-info');
          const wrapper = this.wrapper.node;
          new CardInfo(wrapper, item, () => this.model.setData(item.id));
        }
      );
      this.found.node.style.display = 'none';
    });
    if (wrapper.childNodes.length === 0) {
      this.found.node.style.display = 'block';
      this.foundСounter.node.textContent = 'Found: 0';
    }
  }

  private sortPhones<T>(data: T[], index: number): T[] {
    if (index === 0) {
      return data;
    }
    if (index === 1) {
      return data.sort((a, b) => (a as unknown as IPhones).name.localeCompare((b as unknown as IPhones).name));
    }
    if (index === 2) {
      return data.sort((a, b) => (b as unknown as IPhones).name.localeCompare((a as unknown as IPhones).name));
    }
    if (index === 3) {
      return data.sort((a, b) => (b as unknown as IPhones).price - (a as unknown as IPhones).price);
    }
    if (index === 4) {
      return data.sort((a, b) => (a as unknown as IPhones).price - (b as unknown as IPhones).price);
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
