import Control from '../../../control/control';
import { State } from '../../../control/filterState';
export declare class BrandFilter extends Control {
    manufacturerItem: Control<HTMLInputElement>;
    manufacturer: Control<HTMLElement>;
    filterBrandBlock: Control<HTMLElement>;
    blockManufacturer: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, state: State);
}
