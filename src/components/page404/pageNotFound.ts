import Control from '../../control/control';

export class NotFound extends Control {
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'div', 'not-found');
    new Control(this.node, 'div', 'not-found', 'page 404');
  }
}
