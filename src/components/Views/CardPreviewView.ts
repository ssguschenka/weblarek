import { CardView } from "./CardView";

export class CardPreviewView extends CardView {
  private textElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.textElement = container.querySelector(".card__text")!;
  }

  /**
   * Метод установки описания в карточку товара
   * @param value - описание товара
   */
  setText(value: string) {
    this.textElement.textContent = value;
  }
}
