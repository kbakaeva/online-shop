// import Control from "control/control";

import Main   from "./components/main/main";
import Header from "./components/header/header";

export class App {
    header: Header;
    constructor(parentNode:HTMLElement){
      new Header(parentNode);
      new Main(parentNode)
    }
}