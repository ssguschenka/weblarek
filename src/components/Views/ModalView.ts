export class ModalView {
  private containerElement: HTMLElement;
  private contentElement: HTMLElement;
  private buttonCloseElement: HTMLButtonElement;

  constructor(container: HTMLElement, onClose: () => void) {
    this.containerElement = container.querySelector(".modal__container")!;
    this.contentElement = container.querySelector(".modal__content")!;
    this.buttonCloseElement = container.querySelector(".modal__close")!;

    this.buttonCloseElement.addEventListener("click", () => {
      onClose();
    });

    container.addEventListener("click", (e) => {
      if (e.target === container) {
        onClose();
        this.close();
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
