type up = (date: number[]) => void;
type upPrice = (price: number) => void;
export declare class StateBasket {
    data: number[];
    price: number;
    onUpdate: up;
    onUpdatePrice: upPrice;
    constructor(init: number[]);
    setData(newValue: number): void;
    setPrice(newValue: number, status?: boolean): void;
    removeDate(): void;
}
export {};
