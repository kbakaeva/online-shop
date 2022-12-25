import Control from '../../../control/control';
import { State } from '../../../control/filterState';

export class BrandFilter extends Control {
  manufacturer: Control<HTMLElement>;
  filterBrandBlock: Control<HTMLElement>;
  blockManufacturer: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, state: State) {
    super(parentNode, 'div', 'brand');
    const manufacturer = ['Oppo', 'Samsung', 'Apple', 'Xiaomi', 'Oneplus', 'Huawei'];
    const arrayManufacturer: string[] = [];
    this.blockManufacturer = new Control(this.node, 'div', 'brand-content');
    this.manufacturer = new Control(this.blockManufacturer.node, 'h3', 'brand-title', 'Brand');
    manufacturer.forEach((item) => {
      const filterBrandBlock = new Control(this.node, 'div', 'brand-block');
      const manufacturerItem = new Control(filterBrandBlock.node, 'input', 'brand-checkbox', item, 'type', 'checkbox');
      new Control(filterBrandBlock.node, 'label', 'brand-label', item);
      manufacturerItem.node.onclick = () => {
        const index = arrayManufacturer.indexOf(item);
        if (index === -1) {
          arrayManufacturer.push(item);
          state.content = { ...state.content, manufacturer: [...arrayManufacturer] };
        } else {
          arrayManufacturer.splice(index, 1);
          state.content = { ...state.content, manufacturer: [...arrayManufacturer] };
        }
      };
    });
  }
}
