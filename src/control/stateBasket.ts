type up = (date: number[]) => void;

export class StateBasket {
  data: number[];
  onUpdate!: up;
  constructor(init: number[]) {
    if (init.length >= 0) {
      this.data = init;
    } else {
      const basket = localStorage.getItem('basket') ?? '[]';
      this.data = JSON.parse(basket);
    }
  }

  setData(newValue: number) {
    this.data = [...this.data, newValue];
    localStorage.setItem('basket', JSON.stringify(this.data));
    this.onUpdate(this.data);
  }
  removeDate() {
    this.data = [];
    console.log(this.data);

    this.onUpdate(this.data);
    localStorage.clear();
  }
}
