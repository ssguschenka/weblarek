export class GаlleryView {
  private catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    this.catalogElement = container;
  }

  /**
   * метод отрисовки товаров в каталоге
   * @param items - карточки товаров
   * @returns - каталог с карточками товаров
   */
  renderCatalog(items: HTMLElement[]): HTMLElement {
    this.catalogElement.replaceChildren(...items);
    return this.catalogElement;
  }
}
