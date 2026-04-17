export class BasketView {
  private listElement: HTMLElement;
  private buttonElement: HTMLButtonElement;
  private priceElement: HTMLElement;
  private emptyTextElement: HTMLElement | null = null;

  constructor(
    private container: HTMLElement,
    onSubmit: () => void,
  ) {
    this.listElement = container.querySelector(".basket__list")!;
    this.buttonElement = container.querySelector(".basket__button")!;
    this.priceElement = container.querySelector(".basket__price")!;

    this.buttonElement.addEventListener("click", onSubmit);
  }

  /**
   *
   * @param items - карточки товаров
   * @param value - цена товаров
   * @returns - разметка корзины
   */
  render(items: HTMLElement[], value: number): HTMLElement {
    if (items.length === 0) {
      this.listElement.replaceChildren();
      const empty: HTMLElement = document.createElement("li");
      empty.textContent = "Корзина пуста";
      this.emptyTextElement! = empty;
      this.listElement.append(empty);
      this.setSubmitDisabled(true);
    } else {
      this.listElement.replaceChildren(...items);
      this.emptyTextElement = null;
      this.setSubmitDisabled(false);
    }
    this.priceElement.textContent = `${value} синапсов`;
    return this.container;
  }

  // Метод для отключения кнопки
  setSubmitDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
