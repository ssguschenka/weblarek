import { Component } from "../base/Component";
import { categoryMap } from "../../utils/constants";

export interface ICard {
  title?: string;
  image?: string;
  imageAlt?: string;
  category?: string;
  price?: number | null;
  disabled?: boolean;
}

type CategoryKey = keyof typeof categoryMap;

export class CardView extends Component<ICard> {
  protected priceElement?: HTMLElement;
  protected titleElement?: HTMLElement;
  protected categoryElement?: HTMLElement;
  protected imageElement?: HTMLImageElement;
  protected buttonElement?: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);
    this.priceElement = container.querySelector(".card__price")!;
    this.titleElement = container.querySelector(".card__title")!;
    this.categoryElement = container.querySelector(".card__category")!;
    this.imageElement = container.querySelector(".card__image")!;
    this.buttonElement = container.querySelector(".card__button")!;
  }

  /**
   * Метод установки цены товара
   * @param value - цена товара. Может отсутствовать и  тогда кнопка покупки не активна
   */
  setPrice(value: number | null): void {
    if (!this.priceElement) {
      return;
    }
    if (value === null) {
      this.priceElement.textContent = "Бесценно";
      this.setDisabled(true);
    } else {
      this.priceElement.textContent = `${value} синапсов`;
      this.setDisabled(false);
    }
  }

  /**
   * Метод установки названия товара в карточке
   * @param value - название товара
   */
  setTitle(value: string): void {
    if (!this.titleElement) {
      return;
    } else {
      this.titleElement.textContent = value;
    }
  }

  /**
   * Метод установки категории товара в карточке
   * присваиваем элементу каточки класс из categoryMap, соответствующий категории товара
   * @param value - категория товара
   */
  setCategory(value: CategoryKey): void {
    if (!this.categoryElement) {
      return;
    } else {
      this.categoryElement.textContent = value;
      this.categoryElement.className = categoryMap[value];
    }
  }

  /**
   * Метод установки картинки товара в карточке.
   * вызываем метод в классе Component с параметрами этого метода.
   * @param src - ссылка на картинку
   * @param alt - описание картинки. может отсутствовать
   */
  setImageEl(src: string, alt?: string): void {
    if (!this.imageElement) {
      return;
    } else {
      super.setImage(this.imageElement, src, alt);
    }
  }

  /**
   *  Метод установки кнопки в карточке товара.
   * @param value - текст на кнопке
   */
  setButton(value: string): void {
    if (!this.buttonElement) {
      return;
    } else {
      this.buttonElement.textContent = value;
    }
  }

  /**
   * Метод дезактивации кнопки "Купить" в карточке товара
   * @param value - булевое значение
   */
  setDisabled(value: boolean): void {
    if (!this.buttonElement) {
      return;
    } else {
      this.buttonElement.disabled = value;
    }
  }
}
