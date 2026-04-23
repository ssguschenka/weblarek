import { CardView } from "./CardView";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";

type CategoryKey = keyof typeof categoryMap;

export type TCardCatalog = Pick<IProduct, "description" | "image" | "category">;

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardPreviewView extends CardView<TCardCatalog> {
  private textElement: HTMLElement;
  private categoryElement: HTMLElement;
  private imageElement: HTMLImageElement;
  private buttonElement: HTMLButtonElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);
    this.textElement = ensureElement<HTMLElement>(
      ".card__text",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.buttonElement = ensureElement<HTMLButtonElement>(
      ".card__button",
      this.container,
    );

    if (actions?.onClick) {
      this.buttonElement.addEventListener("click", actions.onClick);
    }
  }

  /**
   * Метод установки описания в карточку товара
   * @param value - описание товара
   */
  set text(value: string) {
    this.textElement.textContent = value;
  }

  /**
   * Метод установки категории товара в карточке
   * присваиваем элементу каточки класс из categoryMap, соответствующий категории товара
   * @param value - категория товара
   */
  set category(value: CategoryKey) {
    this.categoryElement.textContent = value;

    for (const key in categoryMap) {
      this.categoryElement.classList.toggle(
        categoryMap[key as CategoryKey],
        key === value,
      );
    }
  }

  /**
   * Метод установки картинки товара в карточке.
   * вызываем метод в классе Component с параметрами этого метода.
   * @param src - ссылка на картинку
   * @param alt - описание картинки. может отсутствовать
   */
  set image(value: string) {
    const src = `${CDN_URL}${value.replace(".svg", ".png")}`;
    this.setImage(this.imageElement, src, this.title);
  }

  /**
   *  Метод установки кнопки в карточке товара.
   * @param value - текст на кнопке
   */
  set button(value: string) {
    this.buttonElement.textContent = value;
  }

  /**
   * Метод дезактивации кнопки "Купить" в карточке товара
   * @param value - булевое значение
   */
  set disabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
