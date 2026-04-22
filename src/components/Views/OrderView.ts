import { FormView } from "./FormView";
import { ensureAllElements, ensureElement } from "../../utils/utils";
import { IEvents } from "../../types";
import { IBuyer } from "../../types";

export type TOrder = Pick<IBuyer, "payment" | "address">;

export class OrderView extends FormView<TOrder> {
  private buttonsPayElement: HTMLButtonElement[];
  private inputAddress: HTMLInputElement;

  constructor(
    protected form: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(form, events, "order:submit");

    this.inputAddress = ensureElement<HTMLInputElement>(
      '[name="address"]',
      this.form
    );
    this.buttonsPayElement = ensureAllElements<HTMLButtonElement>(
      ".button_alt",
      this.form
    ) as HTMLButtonElement[];

    // выбор оплаты
    this.buttonsPayElement.forEach((button) =>
      button.addEventListener("click", () => {
        this.events.emit("button:payment", { payment: button.name });
      }),
    );

    // ввод адреса
    this.inputAddress.addEventListener("input", () => {
      this.events.emit("form:address", { address: this.inputAddress.value });
    });
  }

  set pay(value: string) {
    this.buttonsPayElement.forEach((button) => {
      button.classList.toggle("button_alt-active", button.name === value);
    });
  }

  set address(value: string) {
    this.inputAddress.value = value;
  }
}
