import Control from '../../../control/control';
import { State } from '../../../control/filterState';
import 'nouislider/dist/nouislider.css';
import * as noUiSlider from 'nouislider';

export default class RangeSliderAmount extends Control {
  sliderNode: Control<HTMLElement>;
  sliderElem: Control<HTMLElement> | undefined;
  slider: noUiSlider.target | undefined;
  startNum: Control<HTMLElement>;
  endNum: Control<HTMLElement>;
  number: Control<HTMLElement>;
  amount: Control<HTMLElement>;

  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'slider');
    this.amount = new Control(this.node, 'div', 'slider-name', 'Amount');
    this.sliderNode = new Control(this.node, 'div', 'slider', '', 'id', 'slider');
    const slider: noUiSlider.target = this.sliderNode.node;
    this.number = new Control(this.node, 'div', 'slider-nums');
    this.startNum = new Control(this.number.node, 'div', 'slider__start-num');
    this.endNum = new Control(this.number.node, 'div', 'slider__end-num');

    noUiSlider.create(slider, {
      start: [state.content.amount[0], state.content.amount[1]],
      connect: true,
      range: {
        min: 1,
        max: 19,
      },
      step: 1,
    });
    slider.noUiSlider?.on('update', (values: (string | number)[], handle: number) => {
      state.content = { ...state.content, amount: values };
      if (handle) {
        this.endNum.node.textContent = Math.ceil(Number(values[handle])).toString();
      } else {
        this.startNum.node.textContent = Math.ceil(Number(values[handle])).toString();
      }
    });
  }
}
