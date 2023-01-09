import Control from '../../control/control';
import './basket.scss';
import IMask, { MaskedRange } from 'imask';
import masterCard from '../../assets/png/master.png';
import unionPay from '../../assets/png/union.png';
import visa from '../../assets/png/visa.png';
import { StateBasket } from '@/control/stateBasket';

export default class Popup extends Control {
  name: Control<HTMLInputElement>;
  phone: Control<HTMLInputElement>;
  adress: Control<HTMLInputElement>;
  mail: Control<HTMLInputElement>;
  card: Control<HTMLElement>;
  cardNum: Control<HTMLInputElement>;
  cardDate: Control<HTMLInputElement>;
  cardCvv: Control<HTMLInputElement>;
  nameLabel: Control<HTMLLabelElement>;
  modal: Control<HTMLElement>;
  content: Control<HTMLFormElement>;
  button: Control<HTMLButtonElement>;
  phoneLabel: Control<HTMLLabelElement>;
  adressLabel: Control<HTMLLabelElement>;
  mailLabel: Control<HTMLLabelElement>;
  pay: Control<HTMLImageElement>;
  textInValid: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, parentDestroy: HTMLElement, stateBasket: StateBasket) {
    super(parentNode, 'div', 'modal');
    this.modal = new Control(this.node, 'div', 'modal-overlay');
    this.content = new Control(this.modal.node, 'form', 'modal-content ');
    this.nameLabel = new Control(this.content.node, 'label', 'modal-label');
    this.name = new Control(this.nameLabel.node, 'input', 'modal-input, valid');
    this.phoneLabel = new Control(this.content.node, 'label', 'modal-label');
    this.phone = new Control(this.phoneLabel.node, 'input', 'modal-phone, valid');
    this.adressLabel = new Control(this.content.node, 'label', 'modal-label');
    this.adress = new Control(this.adressLabel.node, 'input', 'modal-adress, valid');
    this.mailLabel = new Control(this.content.node, 'label', 'modal-label');
    this.mail = new Control(this.mailLabel.node, 'input', 'modal-mail, valid');
    this.name.node.placeholder = 'Фамилия Имя';
    this.phone.node.placeholder = '+7(000)000-00-00';
    this.adress.node.placeholder = 'Адрес';
    this.mail.node.placeholder = 'email';
    this.card = new Control(this.content.node, 'div', 'modal-card');
    this.pay = new Control(this.card.node, 'img', 'modal-card__pay', '', 'src', masterCard);
    this.cardNum = new Control(this.card.node, 'input', 'modal-card__num, valid');
    this.cardDate = new Control(this.card.node, 'input', 'modal-card__date, valid');
    this.cardCvv = new Control(this.card.node, 'input', 'modal-card__cvv, valid');
    this.cardNum.node.placeholder = '0000-0000-0000-0000';
    this.cardDate.node.placeholder = '01/23';
    this.cardCvv.node.placeholder = '123';
    this.textInValid = new Control(this.content.node, 'p', 'modal-text', 'Заполните все поля верно!');
    this.textInValid.node.style.display = 'none';
    this.button = new Control(this.content.node, 'button', 'modal-button', 'Оформить', 'type', 'submit');

    this.inputPhone();
    this.inputMail();
    this.inputCard();
    this.inputCvv();
    this.inputDate();
    this.inputName();
    this.inputAddress();

    this.button.node.addEventListener('click', (e) => {
      if (document.querySelector('.valid') === null) {
        document.body.classList.remove('no-scroll');
        parentDestroy.remove();
        this.destroy();
        new Control(parentNode, 'div', 'submit', 'Заказ оформлен вас перенаправит на главную страницу через 3 секунды');
        localStorage.clear();
        stateBasket.removeDate();
        setTimeout(() => {
          window.location.hash = '';
          window.location.hash = 'main';
        }, 3000);
      } else {
        e.preventDefault();
        this.textInValid.node.style.display = 'block';
      }
    });

    this.modal.node.addEventListener('click', (e) => {
      const { target } = e;
      if (target === this.modal.node) {
        this.destroy();
        document.body.classList.remove('no-scroll');
      }
    });
  }
  inputName() {
    this.name.node.addEventListener('input', () => {
      const re = /[a-zA-Zа-яА-Я]{3,}(\s[a-zA-Zа-яА-Я]{3,})+/;
      const value = this.name.node.value;
      const valid = re.test(value);
      if (valid) {
        this.name.node.classList.remove('valid');
      } else {
        this.name.node.classList.add('valid');
      }
    });
  }
  inputPhone() {
    this.phone.node.addEventListener('input', () => {
      const maskPhone: IMask.InputMask<{
        mask: string;
        lazy: false;
      }> = IMask(this.phone.node, {
        mask: '+0(000)000-00-00',
        lazy: false,
      });
      if (maskPhone.masked.isComplete) {
        this.phone.node.classList.remove('valid');
      } else {
        this.phone.node.classList.add('valid');
      }
    });
  }
  inputAddress() {
    this.adress.node.addEventListener('input', () => {
      const re = /[a-zA-Zа-яА-Я]{5,}(\s[a-zA-Zа-яА-Я]{5,})(\s[a-zA-Zа-яА-Я]{5,})+/;
      const value = this.adress.node.value;
      const valid = re.test(value);

      if (valid) {
        this.adress.node.classList.remove('valid');
      } else {
        this.adress.node.classList.add('valid');
      }
    });
  }
  inputMail() {
    this.mail.node.addEventListener('input', () => {
      const re =
        /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
      const value = this.mail.node.value;
      const valid = re.test(value);

      if (valid) {
        this.mail.node.classList.remove('valid');
      } else {
        this.mail.node.classList.add('valid');
      }
    });
  }
  inputCard() {
    this.cardNum.node.addEventListener('input', () => {
      const firstNum = this.cardNum.node.value[0];
      if (firstNum === '5') {
        this.pay.node.src = masterCard;
      }
      if (firstNum === '6') {
        this.pay.node.src = unionPay;
      }
      if (firstNum === '4') {
        this.pay.node.src = visa;
      }
      const maskCard: IMask.InputMask<{
        mask: string;
        lazy: false;
      }> = IMask(this.cardNum.node, {
        mask: '0000-0000-0000-0000',
        lazy: false,
      });
      if (maskCard.masked.isComplete) {
        this.cardNum.node.classList.remove('valid');
      } else {
        this.cardNum.node.classList.add('valid');
      }
    });
  }
  inputCvv() {
    this.cardCvv.node.addEventListener('input', () => {
      const maskCvv: IMask.InputMask<{
        mask: string;
        lazy: false;
      }> = IMask(this.cardCvv.node, {
        mask: '000',
        lazy: false,
      });
      if (maskCvv.masked.isComplete) {
        this.cardCvv.node.classList.remove('valid');
      } else {
        this.cardCvv.node.classList.add('valid');
      }
    });
  }
  inputDate() {
    this.cardDate.node.addEventListener('input', () => {
      const maskDate: IMask.InputMask<{
        mask: string;

        blocks: {
          m: { mask: typeof MaskedRange; from: number; to: number; maxLength: number };
          Y: { mask: typeof MaskedRange; from: number; to: number };
        };
      }> = IMask(this.cardDate.node, {
        mask: 'm/Y',
        blocks: {
          m: {
            mask: IMask.MaskedRange,
            from: 1,
            to: 12,
            maxLength: 2,
          },
          Y: {
            mask: IMask.MaskedRange,
            from: 23,
            to: 99,
          },
        },
      });
      if (maskDate.masked.isComplete) {
        this.cardDate.node.classList.remove('valid');
      } else {
        this.cardDate.node.classList.add('valid');
      }
    });
  }
}
