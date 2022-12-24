import Control from '../../../control/control';
import {State} from '../../../control/filterState';
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';

export default class RangeSliderPrice extends Control {
  sliderNode: Control<HTMLElement>;
  sliderElem: Control<HTMLElement>;
  slider: noUiSlider.target;
  startNum: Control<HTMLElement>;
  endNum: Control<HTMLElement>;
  number: Control<HTMLElement>;
  price: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'slider');
    this.price = new Control(this.node, 'div', 'slider-name', 'Price $');
    this.sliderNode = new Control(this.node, 'div', 'slider', '', 'id', 'slider');
    const slider: noUiSlider.target = this.sliderNode.node;
    this.number = new Control(this.node, 'div', 'slider-nums');
    this.startNum = new Control(this.number.node, 'div', 'slider__start-num');
    this.endNum = new Control(this.number.node, 'div', 'slider__end-num');

    noUiSlider.create(slider, {
      start: [state.content.price[0], state.content.price[1]],
      connect: true,
      range: {
        min: 150,
        max: 1300,
      },
      step: 10,
    });
    slider.noUiSlider.on('update', (values: string[], handle: number) => {
      state.content = {...state.content, price: values};
      if (handle) {
        this.endNum.node.textContent = Math.ceil(Number(values[handle])).toString();
      } else {
        this.startNum.node.textContent = Math.ceil(Number(values[handle])).toString();
      }
    });
  }
}
