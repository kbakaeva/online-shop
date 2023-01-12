import Signal from './signal';
import { IFilters } from '../interface/filter';
import { initialState } from '../index';
export class State {
  private _filters: IFilters | undefined;
  params: URLSearchParams | undefined;
  url: Location | undefined;

  get content() {
    if (this._filters) {
      return this._filters;
    } else {
      return initialState;
    }
  }

  set content(value: IFilters) {
    this._filters = value;
    this.onChange.emit(this._filters);
    this.url = window.location;
    this.params = new URLSearchParams(this.url.search);
    for (const [key, val] of Object.entries(value)) {
      if (val) {
        this.params.set(key, val);
      } else {
        this.params.delete(key);
      }
    }
    const newRelativePathQuery = window.location.pathname + '?' + this.params.toString() + window.location.hash;
    history.pushState(null, '', newRelativePathQuery);
  }
  setInit(value: IFilters) {
    this._filters = value;
    this.onChange.emit(this._filters);
  }

  onChange = new Signal<IFilters>();
}
