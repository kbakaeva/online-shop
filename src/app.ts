// import Control from "control/control";

import Main   from "./components/main/main";
import Header from "./components/header/header";
import { State } from "control/state";


export class App {
    header: Header;
    constructor(parentNode:HTMLElement, state:State){
      new Header(parentNode);
      new Main(parentNode, state)
    }
}