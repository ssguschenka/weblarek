import { CardView } from "./CardView";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../types";
import { IProduct } from "../../types";

export type ICardBasket = Pick<IProduct, "id">;

export class CardBasketView extends CardView<ICardBasket> {
  private indexElement: HTMLElement;
  private buttonRemoveElement: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: IEvents) {
    super(container);
    this.indexElement = ensureElement<HTMLElement>(".basket__item-index", this.container);
    this.buttonRemoveElement = ensureElement<HTMLButtonElement>(".basket__item-delete", this.container);

    this.buttonRemoveElement.addEventListener("click", (e) => {
      e.preventDefault();
      this.events.emit("products:design", {button: this.buttonRemoveElement.classList})
    });
  }

  /**
   * Метод установки порядкового номера товара в корзине
   * @param value - порядковый номер
   */
  set index(value: number) {
    this.indexElement.textContent = String(value);
  }
}