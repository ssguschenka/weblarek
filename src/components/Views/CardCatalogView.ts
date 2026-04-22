import { CardView } from "./CardView";
import { categoryMap, CDN_URL } from "../../utils/constants";
import { ensureElement } from "../../utils/utils";
import { IProduct } from "../../types";

type CategoryKey = keyof typeof categoryMap;
export type TCardCatalog = Pick<IProduct, "image" | "category">;

interface ICardActions {
  onClick: (event: MouseEvent) => void;
}

export class CardCatalogView extends CardView<TCardCatalog> {
  protected imageElement: HTMLImageElement;
  protected categoryElement: HTMLElement;

  constructor(container: HTMLElement, actions?: ICardActions) {
    super(container);

    if (actions?.onClick) {
      this.container.addEventListener("click", actions.onClick);
    }

    this.imageElement = ensureElement<HTMLImageElement>(
      ".card__image",
      this.container,
    );
    this.categoryElement = ensureElement<HTMLElement>(
      ".card__category",
      this.container,
    );
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
   * @param value - ссылка на картинку
   */
  set image(value: string) {
    const src = `${CDN_URL}${value.replace(".svg", ".png")}`;
    this.setImage(this.imageElement, src, this.title);
  }
}
