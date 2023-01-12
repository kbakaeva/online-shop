import { expect, it } from '@jest/globals';
import { StateBasket } from './stateBasket';

const basket = new StateBasket([]);
basket.setData(2);
basket.setPrice(10);
it('toEqual State', () => {
  expect(basket.data).toEqual([2]);
  expect(basket.price).toEqual(10);
});

it('toEqual Null', () => {
  basket.removeDate();
  expect(basket.data).toEqual([]);
  expect(basket.price).toEqual(0);
});
