import Signal from './signal';
import { IFilters } from '../interface/filter';

export class State {
  private _filters: IFilters;
  params: URLSearchParams;
  url: Location;

  get content() {
    return this._filters;
  }

  set content(value: IFilters) {
    this._filters = value;
    this.onChange.emit(this._filters);
    this.url = window.location;
    this.params = new URLSearchParams(this.url.search);
    for (const [key, val] of Object.entries(value)) {
      if (val) {
        this.params.set(key, val);
      }
    }
    const newRelativePathQuery = window.location.pathname + '?' + this.params.toString();
    history.pushState(null, '', newRelativePathQuery);
  }
  setInit(value: IFilters) {
    this._filters = value;
    this.onChange.emit(this._filters);
  }

  onChange = new Signal<IFilters>();
}
