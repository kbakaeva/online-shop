import Signal from './signal';
import {IFilters} from '../interface/filter';

export const filterState: IFilters = {
  sort: 0,
  search: '',
  manufacturer: [],
  color: [],
  price: ['', ''],
  amount: ['1', '8'],
  button: [],
};

export class State {
  private _filters: IFilters;

  constructor(initial: IFilters) {
    this._filters = initial;
  }

  get content() {
    return this._filters;
  }

  set content(value: IFilters) {
    this._filters = value;
    this.onChange.emit(this._filters);
  }

  onChange = new Signal<IFilters>();
}
