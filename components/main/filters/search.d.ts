import Control from '../../../control/control';
import { State } from '../../../control/filterState';
export declare class Search extends Control {
    input: Control<HTMLInputElement>;
    cross: Control<HTMLInputElement>;
    lineCrossOne: Control<HTMLElement>;
    lineCrossTwo: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, state: State);
}
