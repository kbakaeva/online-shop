type up = (date: number[]) => void;

export class StateBasket {
  data: number[];
  onUpdate!: up;
  constructor(init: number[]) {
    this.data = init;
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
  removeDate() {
    this.data = [];
    this.onUpdate(this.data);
    localStorage.clear();
  }
}
