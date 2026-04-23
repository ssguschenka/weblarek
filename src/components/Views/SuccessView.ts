import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

export interface ISuccess {
  title: string,
  text: string,
  button: HTMLButtonElement;
}

export class SuccessView extends Component<ISuccess>{
  private titleElement: HTMLElement;
  private textElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor( container: HTMLElement, protected events: IEvents) {
    super(container);

    this.titleElement = ensureElement<HTMLElement>(".order-success__title", this.container);
    this.textElement = ensureElement<HTMLElement>(".order-success__description", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".order-success__close", this.container);

    this.buttonElement.addEventListener('click', () => this.events.emit("order:accepted"));
  }

  set title(value: string) {
    this.titleElement.textContent = value;
  }

  set text(value: string) {
    this.textElement.textContent = value;
  }
}
