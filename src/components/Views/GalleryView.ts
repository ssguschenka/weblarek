import { Component } from "../base/Component";

export interface IGallery {
  catalog: HTMLElement[];
}

export class GalleryView extends Component<IGallery> {
  private catalogElement: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);
    this.catalogElement = container;
  }

  /**
   * метод отрисовки товаров в каталоге
   * @param items - карточки товаров
   */
  set catalog(items: HTMLElement[]) {
    this.catalogElement.replaceChildren(...items);
  }
}
