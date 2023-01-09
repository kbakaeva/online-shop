import Control from '../../control/control';
import './header.scss';
export default class Header extends Control {
    image: Control<HTMLImageElement>;
    text: Control<HTMLElement> | undefined;
    main: Control<HTMLElement>;
    clearHash: Control<HTMLElement>;
    textShop: Control<HTMLElement>;
    totalSum: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, localstor: number, totalPrice: number);
    updateBasket(local: number): void;
    totalPrices(price: number): void;
}
