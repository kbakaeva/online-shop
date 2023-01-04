type up = (date: number[]) => void;
type upPrice = (price: number) => void;

export class StateBasket {
  data: number[];
  price: number;
  onUpdate!: up;
  onUpdatePrice!: upPrice;
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
    this.onUpdate(this.data);
  }

  setPrice(newValue: number, status = true) {
    status ? (this.price = this.price + newValue) : (this.price = this.price - newValue);
    localStorage.setItem('price', JSON.stringify(this.price));
    this.onUpdatePrice(this.price);
  }

  removeDate() {
    this.data = [];
    this.price = 0;
    this.onUpdate(this.data);
    this.onUpdatePrice(this.price);
    localStorage.clear();
  }
}
