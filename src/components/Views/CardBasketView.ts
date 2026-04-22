import { CardView } from "./CardView";
import { ensureElement } from "../../utils/utils";

import { IProduct } from "../../types";

export interface ICardBasket {
  index: number
}

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardBasketView extends CardView<IProduct> {
  private indexElement: HTMLElement;
  private buttonRemoveElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.indexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.buttonRemoveElement = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

    if (actions?.onClick) {
      this.buttonRemoveElement.addEventListener("click", actions.onClick);
    }
  }

  /**
   * Метод установки порядкового номера товара в корзине
   * @param value - порядковый номер
   */
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}