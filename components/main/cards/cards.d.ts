import { IPhones } from '../../../interface/phones';
import Control from '../../../control/control';
import './cards.scss';
export default class Cards extends Control {
    title: Control<HTMLElement>;
    img: Control<HTMLElement>;
    color: Control<HTMLElement>;
    subtitle: Control<HTMLElement>;
    price: Control<HTMLElement>;
    amount: Control<HTMLElement>;
    button: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, item: IPhones, onButtonClick: () => void, onCardClick: () => void);
    localStorageAdd(item: IPhones): void;
}
