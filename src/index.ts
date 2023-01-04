import { State } from './control/filterState';
import { App } from './app';
import { IFilters } from './interface/filter';

const root = document.createElement('div');
root.classList.add('root');
root.setAttribute('id', 'root');
document.body.append(root);
const state = new State();
export const initialState: IFilters = {
  sort: 0,
  search: '',
  manufacturer: [],
  color: [],
  price: ['150', '1300'],
  amount: ['1', '19'],
  button: [],
};
interface ExampleObject {
  [key: string]: string | number;
}
const local = window.location.search;
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
  if (obj.search) {
    const search = obj.search.toString();
    obj.search = search;
  }
  if (obj.sort) {
    const sort = +obj.sort;
    obj.sort = sort;
  }
  return obj as unknown as IFilters;
}
state.setInit({ ...initialState, ...updateQueryStringParameter(local) });
new App(root, state);
