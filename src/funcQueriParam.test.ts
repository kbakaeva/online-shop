import { IFilters } from './interface/filter';

interface ExampleObject {
  [key: string]: string | number;
}
const local = `https://kbakaeva.github.io/online-shop/?manufacturer=&color=&price=150%2C1300&amount=1%2C19&button=&=&sort=1&search=a`;
function updateQueryStringParameter(url: string) {
  const queriSplit = url.slice(1).split('&').slice(0);
  const queri = queriSplit.map((item) => {
    const [key, ...value] = item.split('=');
    if (value[0] === '') {
      return;
    }
    const arrValue = value.join('').split('%2C');

    const x: ExampleObject = key.split(' ').reduce((acc, v) => ({ ...acc, [v]: arrValue }), {});
    return x;
  });

  const obj = queri.reduce((acc, val) => {
    return { ...acc, ...val };
  }, {});
  if (obj?.search) {
    const search = obj.search.toString();
    obj.search = search;
  }
  if (obj?.sort) {
    const sort = +obj.sort;
    obj.sort = sort;
  }
  return obj as unknown as IFilters;
}
const toExpect = updateQueryStringParameter(local);

it('toBe updateQueryStringParameter', () => {
  expect(toExpect).toStrictEqual({ amount: ['1', '19'], price: ['150', '1300'], search: 'a', sort: 1 });
});

it('Not toBe updateQueryStringParameter', () => {
  expect(toExpect).not.toBe({ amount: ['2', '29'], price: ['1500', '13000'], search: 'a12', sort: 2 });
});
it('toBeDefined updateQueryStringParameter', () => {
  expect(toExpect).toBeDefined();
});
