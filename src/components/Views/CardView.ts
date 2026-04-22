import { Component } from "../base/Component";
import { ensureElement } from "../../utils/utils";

export interface ICard {
  title: string;
  price: number | null;
}

export class CardView<T> extends Component<ICard & T> {
  protected priceElement: HTMLElement;
  protected titleElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.priceElement = ensureElement<HTMLElement>(".card__price", this.container);
    this.titleElement = ensureElement<HTMLElement>(".card__title", this.container);
  }

/**
   * Метод установки названия товара в карточке
   * @param value - название товара
   */
  set title(value: string) {
      this.titleElement.textContent = value;
  }

  /**
   * Метод установки цены товара
   * @param value - цена товара. Может отсутствовать и  тогда кнопка покупки не активна
   */
  set price(value: number | null) {
    if (value === null) {
      this.priceElement.textContent = "Бесценно";
    } else {
      this.priceElement.textContent = `${value} синапсов`;
    }
  }
 
}
