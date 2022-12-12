// import Control from "control/control";

import Header from "./components/header/header";

export class App {
    header: Header;
    constructor(parentNode:HTMLElement){
      new Header(parentNode);
    }
}