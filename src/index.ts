import {State} from './control/filterState';
import {App} from './app';
import {IFilters} from './interface/filter';

const root = document.createElement('div');
root.classList.add('root');
root.setAttribute('id', 'root');
document.body.append(root);

const state = new State();
const initialState: IFilters = {
  sort: 0,
  search: '',
  manufacturer: [],
  color: [],
  price: ['150', '1300'],
  amount: ['1', '14'],
  button: [],
};
interface ExampleObject {
  [key: string]: string | number;
}
const local = window.location.search;
function updateQueryStringParameter(uri: string) {
  const queriSplit = uri.slice(1).split('&').slice(0);
  const queri = queriSplit.map((item) => {
    const [a, ...b] = item.split('=');
    const arrValue = b.join('').split('%2C');
    // const arrSort = Number(arrValue[1]);
    const c = a.split(' ').reduce((acc, v) => ({...acc, [v]: arrValue}), {});

    // const obj = Object.create(...c);
    // c.reduce
    return c;
  });
  const obj: ExampleObject = queri.reduce((acc, val) => {
    return {...acc, ...val};
  }, {});
  console.log(obj);

  return obj;

  // state.setInit(obj);

  // return queri;
}

// const localFunc = updateQueryStringParameter(local);
// localFunc.sort;
console.log(updateQueryStringParameter(local));

state.setInit(initialState);

new App(root, state);
