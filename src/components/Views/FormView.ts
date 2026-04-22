import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

interface IForm {
  button: HTMLButtonElement;
  errors: {};
}

export class FormView<T> extends Component<IForm & T> {
  protected buttonSubmit: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(
    protected container: HTMLElement,
    protected events: IEvents,
  ) {
    super(container);

    this.buttonSubmit = ensureElement<HTMLButtonElement>(
      '[type="submit"]',
      this.container
    );
    this.errorsElement = ensureElement<HTMLElement>(".form__errors", this.container);

    this.buttonSubmit.addEventListener('click', () => {
      this.events.emit("button:clicked", {button: this.buttonSubmit.classList})
    })
  }

  /**
   * Метод отрисовки сообщений об ошибках валидации
   * @param errors - ошибки валидации
   */
  set errors(errors: Record<string, string>) {
    this.errorsElement.textContent = Object.values(errors)
      .filter(Boolean)
      .join(", ");
  }

  /**
   * Метод дезактивации кнопки отправки данных
   * @param value - булевое значение
   */
  set disabled(value: boolean) {
    this.buttonSubmit.disabled = value;
  }
}
