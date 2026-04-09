export class HeaderView {
  private basketButton: HTMLButtonElement;
  private counterElement: HTMLElement;

  constructor(container: HTMLElement, onOpenBasket: () => void) {
    this.counterElement = container.querySelector(".header__basket-counter")!;
    this.basketButton = container.querySelector(".header__basket")!;
    this.basketButton.addEventListener("click", onOpenBasket);
  }

  /**
   * метод установки занчения колличества товаров в корзине
   * @param value - колличесто товаров в корзине
   */
  setCounter(value: number): void {
    this.counterElement.textContent = String(value);
  }
}
