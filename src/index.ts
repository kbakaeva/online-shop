import { filterState } from "./control/filtersState";
import { State } from "./control/state";
import  { App }  from "./app"

const root = document.createElement('div');
root.classList.add('root');
root.setAttribute('id', 'root');
document.body.append(root);

const state = new State(filterState);

new App(root, state);