import { expect, it } from '@jest/globals';
import { State } from './filterState';
import { IFilters } from '@/interface/filter';

const initialState: IFilters = {
  manufacturer: [],
  color: [],
  price: ['150', '1300'],
  amount: ['1', '19'],
  sort: 1,
  search: 'a',
  button: [],
};

it('toEqual State', () => {
  const state = new State();
  state.setInit(initialState);
  expect(state.content).toEqual(initialState);
});
