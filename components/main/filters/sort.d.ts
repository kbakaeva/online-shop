import Control from '../../../control/control';
import { State } from '../../../control/filterState';
export declare class Sort extends Control {
    sort: Control<HTMLSelectElement>;
    options: Control<HTMLOptionElement>;
    optionsRev: Control<HTMLOptionElement>;
    optionsRevers: Control<HTMLOptionElement>;
    camera: Control<HTMLOptionElement>;
    amount: Control<HTMLOptionElement>;
    constructor(parentNode: HTMLElement, state: State);
}
