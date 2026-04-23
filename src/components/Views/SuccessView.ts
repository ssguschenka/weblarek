import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

export interface ISuccess {
  text: string;
  button: HTMLButtonElement;
}

export class SuccessView extends Component<ISuccess> {
  private textElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(
    container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.textElement = ensureElement<HTMLElement>(
      ".order-success__description",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".order-success__close",
      this.container,
    );

    this.buttonElement.addEventListener("click", () =>
      this.events.emit("modal:closed"),
    );
  }

  /** Метод установки колличесива списанных синапсов
   * @param value - сумма покупки
   */
  set text(value: string) {
    this.textElement.textContent = value;
  }
}
