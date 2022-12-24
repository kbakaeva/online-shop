import { State } from './control/filterState';
import { App } from './app';
import { IFilters } from './interface/filter';

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
// function sort(urlSort: string): number {

//   urlSort =
//   return 0;
// }
// console.log(sort(local));

function updateQueryStringParameter(uri: string) {
  const queriSplit = uri.slice(1).split('&').slice(0);
  const sort = queriSplit[5];
  console.log(sort);
  console.log(queriSplit[6]);
  // const sort = queriSplit.indexOf('sort=2');
  // console.log('sort', sort);

  const queri = queriSplit.map((item) => {
    console.log(item.split('='));

    const [a, ...b] = item.split('=');
    const arrValue = b.join('').split('%2C');
    // console.log(arrValue, 'asdas');

    // console.log(decodeURI(arrValue.search));

    // const arrSort = Number(arrValue[1]);

    const c = a.split(' ').reduce((acc, v) => ({...acc, [v]: arrValue}), {});

    return c;
  });
  // queri.map((a) => {
  //   console.log(a === 'sort');
  // });
  const obj: ExampleObject = queri.reduce((acc, val) => {
    return {...acc, ...val};
  }, {});
  // console.log(decodeURI(obj.search) as string);

  // console.log((obj.sort = 0));
  // console.log((obj.search = 'asdas'));
  // console.log(obj);
  return obj;

//   // return queri;
// }

// const localFunc = updateQueryStringParameter(local);
// localFunc.sort;

state.setInit(initialState);

new App(root, state);
