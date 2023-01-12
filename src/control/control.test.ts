import { expect, it } from '@jest/globals';
import Control from './control';

it('toBe Control ParentNode', () => {
  const parentNode = document.createElement('div');
  new Control(parentNode);
  expect(parentNode.childNodes).toHaveLength(1);
});
it('toBe Control ParentNode', () => {
  const parentNode = document.createElement('div');
  new Control(parentNode);
  new Control(parentNode);
  expect(parentNode.childNodes).toHaveLength(2);
});
