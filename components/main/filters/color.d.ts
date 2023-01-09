import Control from '../../../control/control';
import { State } from '../../../control/filterState';
export declare class FilterColor extends Control {
    color: Control<HTMLElement>;
    blockColor: Control<HTMLElement>;
    colorItem: Control<HTMLInputElement>;
    constructor(parentNode: HTMLElement, state: State);
}
