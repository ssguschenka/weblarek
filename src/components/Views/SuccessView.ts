export class SuccessView {
  private titleElement: HTMLElement;
  private textElement: HTMLElement;
  private buttonElement: HTMLButtonElement;

  constructor(private container: HTMLElement) {
    this.titleElement = container.querySelector(".order-success__title")!;
    this.textElement = container.querySelector(".order-success__description")!;
    this.buttonElement = container.querySelector(".order-success__close")!;
  }

  setTitle(value: string) {
    this.titleElement.textContent = value;
  }

  setText(value: string) {
    this.textElement.textContent = value;
  }

  onClose(handler: () => void) {
    this.buttonElement.addEventListener("click", handler);
  }

  render(): HTMLElement {
    return this.container;
  }
}
