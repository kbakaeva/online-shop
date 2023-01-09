import { State } from './control/filterState';
import Header from './components/header/header';
import Control from './control/control';
import { Footer } from './components/footer/footer';
export declare class App {
    header: Header;
    currentPage: Control<HTMLElement>;
    onHacheHandler: () => void;
    footer: Footer;
    constructor(parentNode: HTMLElement, state: State);
}
