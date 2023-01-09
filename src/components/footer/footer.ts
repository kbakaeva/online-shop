import Control from '../../control/control';
import './footer.scss';
export class Footer extends Control {
  footer: Control<HTMLElement>;
  constructor(parentNode: HTMLElement) {
    super(parentNode, 'footer', 'footer');
    this.footer = new Control(this.node, 'div', 'container-asdasd');
    this.footer.node.innerHTML = `<div class="footer__wrapper">
    <div class="footer__links"><a class="footer__link" href="https://github.com/DaniyarKulov" target="_blank">@DaniyarKulov</a><a class="footer__link" href="https://github.com/kbakaeva" target="_blank">@kbakaeva</a></div>
    <div class="footer__year">2023</div><a class="footer__logo" href="https://rs.school/js/" target="_blank" aria-label="Курсы RSS JS/FE"></a></div>`;
  }
}
