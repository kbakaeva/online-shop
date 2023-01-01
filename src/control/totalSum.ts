type up = (date: number) => void;

export class totalSuma {
  data: number;
  onUpdate!: up;
  constructor(init: number) {
    this.data = init;
  }

  decrement() {
    this.data -= 1;
    // const indexData = this.data.indexOf(value);
    // this.data.splice(indexData, 1);
    // localStorage.setItem('totalSum', JSON.stringify(this.data));
    this.onUpdate(this.data);
  }
  increment() {
    this.data += 1;
    this.onUpdate(this.data);
  }
}
