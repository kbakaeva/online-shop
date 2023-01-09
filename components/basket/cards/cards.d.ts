import { StateBasket } from '../../../control/stateBasket';
import Control from '../../../control/control';
import { IPhones } from '../../../interface/phones';
import './cards.scss';
export default class Cards extends Control {
    title: Control<HTMLElement>;
    img: Control<HTMLElement>;
    color: Control<HTMLElement>;
    subtitle: Control<HTMLElement>;
    amount: Control<HTMLElement>;
    counter: Control<HTMLElement>;
    price: Control<HTMLElement>;
    counterBlock: Control<HTMLElement>;
    increment: Control<HTMLElement>;
    decrement: Control<HTMLElement>;
    count: Control<HTMLElement>;
    basket: StateBasket;
    constructor(parentNode: HTMLElement, item: IPhones, basket: StateBasket);
    onIncrement: (item: IPhones) => void;
    onDecrement: (item: IPhones) => void;
}
