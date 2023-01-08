import { IPhones } from '../../../interface/phones';
import Control from '../../../control/control';

export class CardInfo extends Control {
  title: Control<HTMLElement>;
  img: Control<HTMLImageElement>;
  color: Control<HTMLElement>;
  subtitle: Control<HTMLElement>;
  amount: Control<HTMLElement>;
  price: Control<HTMLElement>;
  img2: Control<HTMLImageElement>;
  desciption: Control<HTMLElement>;
  imgMain: Control<HTMLImageElement>;
  breadCrumbs: Control<HTMLElement>;
  breadCrumbsStore: Control<HTMLElement>;
  breadCrumbsBrand: Control<HTMLElement>;
  textBlock: Control<HTMLElement>;
  imgBlock: Control<HTMLElement>;
  constructor(parentNode: HTMLElement, item: IPhones) {
    super(parentNode, 'div', 'description');
    this.breadCrumbs = new Control(this.node, 'div', 'description-crumbs');
    this.breadCrumbsStore = new Control(this.breadCrumbs.node, 'div', 'description-crumbs-store', `Store >> `);
    this.breadCrumbsBrand = new Control(
      this.breadCrumbs.node,
      'div',
      'description-crumbs-store__brand',
      `${item.manufacturer} >> ${item.name}`
    );

    this.imgBlock = new Control(this.node, 'div', 'description=img-block');
    this.img = new Control(this.imgBlock.node, 'img', 'description-img', '', 'src', item.image);
    this.img2 = new Control(this.imgBlock.node, 'img', 'description-img', '', 'src', item.image2);
    this.imgMain = new Control(this.imgBlock.node, 'img', 'description-img-main', '', 'src', item.image);
    this.img.setOnClick(() => {
      this.imgMain.node.src = item.image;
    });
    this.img2.setOnClick(() => {
      this.imgMain.node.src = item.image2;
    });

    this.textBlock = new Control(this.node, 'div', 'description-card-block');
    this.title = new Control(this.textBlock.node, 'div', 'description-card', `Название: ${item.name}`);
    this.subtitle = new Control(this.textBlock.node, 'div', 'description-card', `Производитель: ${item.manufacturer}`);
    this.desciption = new Control(this.textBlock.node, 'div', 'description-card', `Информация: ${item.description}`);
    this.color = new Control(this.textBlock.node, 'div', 'description-card', `Цвет: ${item.color}`);
    this.amount = new Control(this.textBlock.node, 'div', 'description-card', `На складе: ${item.amount}`);
    this.price = new Control(this.textBlock.node, 'div', 'description-card', `Стоимость: $${item.price}`);
  }
}
