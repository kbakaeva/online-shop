import Control from '../../../control/control';
import { State } from '../../../control/filterState';
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';
export default class RangeSliderAmount extends Control {
    sliderNode: Control<HTMLElement>;
    sliderElem: Control<HTMLElement>;
    slider: noUiSlider.target;
    startNum: Control<HTMLElement>;
    endNum: Control<HTMLElement>;
    number: Control<HTMLElement>;
    amount: Control<HTMLElement>;
    constructor(parentNode: HTMLElement, state: State);
}
