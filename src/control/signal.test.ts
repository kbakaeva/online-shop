import { expect, it } from '@jest/globals';
import Signal from './signal';

it('toEqual Signal add', () => {
  const signal = new Signal();
  function test() {
    console.log('test');
  }
  signal.add(test);
  expect(signal.emit('test')).toEqual(test());
});
it('toEqual Signal remove', () => {
  const signal = new Signal();
  function test() {
    console.log('test');
  }
  signal.remove(test);
  expect(signal.emit('test')).toBeUndefined();
});
