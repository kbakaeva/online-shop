import { IPhones } from '../../../interface/phones';
import Control from '../../../control/control';
export declare class CardInfo extends Control {
    title: Control<HTMLElement>;
    img: Control<HTMLImageElement>;
    color: Control<HTMLElement>;
    subtitle: Control<HTMLElement>;
    amount: Control<HTMLElement>;
    price: Control<HTMLElement>;
    img2: Control<HTMLImageElement>;
    desciption: Control<HTMLElement>;
    imgMain: Control<HTMLImageElement>;
    breadCrumbs: Control<HTMLElement>;
    breadCrumbsStore: Control<HTMLElement>;
    breadCrumbsBrand: Control<HTMLElement>;
    textBlock: Control<HTMLElement>;
    imgBlock: Control<HTMLElement>;
    buttonAdd: Control<HTMLElement>;
    buttonOneClick: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, item: IPhones, onButtonClick: () => void);
}
