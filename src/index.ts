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
  amount: ['1', '19'],
  button: [],
};
// const initialState: IFilters = {
//   sort: 0,
//   search: '',
//   manufacturer: [],
//   color: [],
//   price: ['150', '1300'],
//   amount: ['1', '19'],
//   button: [],
// };
// interface ExampleObject {
//   [key: string]: string | number | [];
// }
// const local = window.location.search;

// function updateQueryStringParameter(url: string) {
//   const queriSplit = url.slice(1).split('&').slice(0);

//   const queri = queriSplit.map((item) => {
//     const [a, ...b] = item.split('=');
//     const arrValue = b.join('').split('%2C');

//     // console.log(decodeURI(arrValue.search));

//     const x: ExampleObject = a.split(' ').reduce((acc, v) => ({...acc, [v]: arrValue}), {});

//     return x;
//   });

//   console.log(queri);

//   const obj = queri.reduce((acc, val) => {
//     return {...acc, ...val};
//   }, {});
//   if (!obj.search || obj.sort) {
//     const search = obj.search.toString();
//     const sort = Number(obj.sort);

//     obj.search = search;
//     obj.sort = sort;
//   }

//   return obj;
// }
// console.log(updateQueryStringParameter(local));

// state.setInit(updateQueryStringParameter(local));

state.setInit(initialState);

new App(root, state);
