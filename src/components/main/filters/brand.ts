import Control from '../../../control/control';
import {State} from '../../../control/filterState';

export class BrandFilter extends Control {
  manufacturerItem: Control<HTMLInputElement>;
  manufacturer: Control<HTMLElement>;
  filterBrandBlock: Control<HTMLElement>;
  blockManufacturer: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'brand');
    const manufacturer = ['Oppo', 'Samsung', 'Apple', 'Xiaomi', 'One Plus', 'Huawei'];
    const arrayManufacturer: string[] = [];
    this.blockManufacturer = new Control(this.node, 'div', 'brand-content');
    this.manufacturer = new Control(this.blockManufacturer.node, 'h3', 'brand-title', 'Brand');
    manufacturer.forEach((item) => {
      const filterBrandBlock = new Control(this.node, 'div', 'brand-block');
      this.manufacturerItem = new Control(filterBrandBlock.node, 'input', 'brand-checkbox', item, 'type', 'checkbox');
      if (state.content.manufacturer.includes(item)) {
        this.manufacturerItem.node.checked = true;
      }
      new Control(filterBrandBlock.node, 'label', 'brand-label', item);
      this.manufacturerItem.node.onclick = () => {
        const index = arrayManufacturer.indexOf(item);
        if (index === -1) {
          arrayManufacturer.push(item);
          state.content = {...state.content, manufacturer: [...arrayManufacturer]};
        } else {
          arrayManufacturer.splice(index, 1);
          state.content = {...state.content, manufacturer: [...arrayManufacturer]};
        }
      };
    });
  }
}
