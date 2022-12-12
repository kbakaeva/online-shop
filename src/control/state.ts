import Signal from './signal';
import { IFilters } from '../interface/filter';

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
