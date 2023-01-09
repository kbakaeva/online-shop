import Signal from './signal';
import { IFilters } from '../interface/filter';
export declare class State {
    private _filters;
    params: URLSearchParams;
    url: Location;
    get content(): IFilters;
    set content(value: IFilters);
    setInit(value: IFilters): void;
    onChange: Signal<IFilters>;
}
