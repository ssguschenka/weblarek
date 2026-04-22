import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

interface IModal {
  container: HTMLElement,
  content: HTMLElement,
  button: HTMLButtonElement
}

export class ModalView extends Component<IModal>{
  private containerElement: HTMLElement;
  private contentElement: HTMLElement;
  private buttonCloseElement: HTMLButtonElement;

  constructor(protected container: HTMLElement, protected events: IEvents) {
    super(container); 

    this.containerElement = container;
    this.contentElement = ensureElement<HTMLElement>(".modal__content", this.container);
    this.buttonCloseElement = ensureElement<HTMLButtonElement>(".modal__close", this.container);

    this.buttonCloseElement.addEventListener("click", () => {
      this.events.emit("modal:closed", {button: this.buttonCloseElement.classList})
    });

    container.addEventListener("click", (e) => {
      if (e.target === container) {
       this.events.emit("modal:closed")
      }
    });
  }

/**
 * Метод открытия модалього окна. Добавляем класс modal_active контенеру и контент
 * @param content 
 */
  open(content: HTMLElement): void {
    this.contentElement.replaceChildren(content);
    this.containerElement.classList.add("modal_active");
  }


  /**
   * Метод закрытия модального окна. Удаляем класс modal_active и контент в контейнере
   */
  close() {
    this.contentElement.replaceChildren();
    this.containerElement.classList.remove("modal_active");
  }
}
