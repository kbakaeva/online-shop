import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import './counter.scss';
export declare class Counter extends Control {
    counterBlock: Control<HTMLElement>;
    increment: Control<HTMLElement>;
    decrement: Control<HTMLElement>;
    counter: Control<HTMLElement>;
    total: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, item: IPhones);
    onIncrement(item: IPhones): void;
    onDecrement(item: IPhones): void;
}
