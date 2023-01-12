type Up = (date: number[]) => void;
type UpPrice = (price: number) => void;

export class StateBasket {
  data: number[];
  price: number;
  onUpdate?: Up;
  onUpdatePrice?: UpPrice;
  constructor(init: number[]) {
    this.data = init;
    this.price = 0;
  }
  setData(newValue: number) {
    if (this.data.indexOf(newValue) === -1) {
      this.data.push(newValue);
    } else {
      const indexValue = this.data.indexOf(newValue);
      this.data.splice(indexValue, 1);
    }
    localStorage.setItem('basket', JSON.stringify(this.data));
    if (this.onUpdate) {
      this.onUpdate(this.data);
    }
  }

  setPrice(newValue: number, status = true) {
    status ? (this.price = this.price + newValue) : (this.price = this.price - newValue);
    localStorage.setItem('price', JSON.stringify(this.price));
    if (this.onUpdatePrice) {
      this.onUpdatePrice(this.price);
    }
  }

  removeDate() {
    this.data = [];
    this.price = 0;
    if (this.onUpdate) {
      this.onUpdate(this.data);
    }
    if (this.onUpdatePrice) {
      this.onUpdatePrice(this.price);
    }
    localStorage.clear();
  }
}
