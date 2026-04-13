export class FormView {
  protected buttonSubmit: HTMLButtonElement;
  protected errorsElement: HTMLElement;

  constructor(protected container: HTMLFormElement) {
    this.buttonSubmit = container.querySelector('[type="submit"]') as HTMLButtonElement;
    this.errorsElement = container.querySelector(".form__errors")!;
  }


  /**
   * Метод отрисовки сообщений об ошибках валидации
   * @param errors - ошибки валидации
   */
  setErrors(errors: Record<string, string>): void {
    this.errorsElement.textContent = Object.values(errors)
      .filter(Boolean)
      .join(", ");
  }


  /**
   * Метод дезактивации кнопки отправки данных
   * @param value - булевое значение
   */
  setDisabled(value: boolean): void {
    this.buttonSubmit.disabled = value;
  }
}
