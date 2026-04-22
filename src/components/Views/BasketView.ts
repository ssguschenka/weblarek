import { ensureElement } from "../../utils/utils";
import { Component } from "../base/Component";
import { IEvents } from "../../types";

interface IBasket {
  list: HTMLElement[]
  button: HTMLButtonElement,
  price: number | null
}

export class BasketView extends Component<IBasket>{
  private listElement: HTMLElement;
  private buttonElement: HTMLButtonElement;
  private priceElement: HTMLElement;

  constructor(container: HTMLElement, protected evenst: IEvents) {
    super(container);

    this.listElement = ensureElement<HTMLElement>(".basket__list", this.container);
    this.buttonElement = ensureElement<HTMLButtonElement>(".basket__button", this.container);
    this.priceElement = ensureElement<HTMLElement>(".basket__price", this.container);

    this.buttonElement.addEventListener("click", () => {
      this.evenst.emit("products:buy")
    });
  }

  //Метод установки элементов корзины
  set items(items: HTMLElement[]) {
    this.listElement.replaceChildren(...items);
  }


  //Метод установки суммы продуктов в корзине
  set price(value: number) {
    this.priceElement.textContent = `${value} синапсов`;
  }

  // Метод для отключения кнопки
  set submitDisabled(value: boolean) {
    this.buttonElement.disabled = value;
  }
}
