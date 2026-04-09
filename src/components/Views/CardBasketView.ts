import { CardView } from "./CardView";

export class CardBasketView extends CardView {
  private indexElement: HTMLElement;
  private buttonRemoveElement: HTMLButtonElement;

  constructor(container: HTMLElement, onDelite: () => void) {
    super(container);
    this.indexElement = container.querySelector(".basket__item-index")!;
    this.buttonRemoveElement = container.querySelector(".basket__item-delete")!;
    this.buttonRemoveElement.addEventListener("click", (e) => {
      e.preventDefault();
      onDelite();
    });
  }

  /**
   * Метод установки порядкового номера товара в корзине
   * @param value - порядковый номер
   */
  setIndex(value: number) {
    this.indexElement.textContent = String(value);
  }
}
