import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

interface IHeader {
  counter: number;
}

export class HeaderView extends Component<IHeader> {
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor( container: HTMLElement,
    protected events: IEvents
    
  ) {
    super(container);

    this.counterElement = ensureElement<HTMLElement>(
      ".header__basket-counter",
      this.container,
    );
    this.basketButton = ensureElement<HTMLButtonElement>(
      ".header__basket",
      this.container,
    );
    this.basketButton.addEventListener("click", () => {
      this.events.emit("basket:open");
    });
  }

  /**
   * метод установки занчения колличества товаров в корзине
   * @param value - колличесто товаров в корзине
   */
  set counter(value: number) {
    this.counterElement.textContent = String(value);
  }
}

