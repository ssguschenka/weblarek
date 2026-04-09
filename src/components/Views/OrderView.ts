import { FormView } from "./FormView";
import { EventEmitter } from "../base/Events";

export class OrderView extends FormView {
  private buttonsPayElement: NodeListOf<HTMLButtonElement>;
  private imputAddress: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    private events: EventEmitter,
  ) {
    super(form);

    this.imputAddress = form.elements.namedItem("address") as HTMLInputElement;
    this.buttonsPayElement = form.querySelectorAll(".order__buttons ")!;

    // выбор оплаты
    this.buttonsPayElement.forEach((button) =>
      button.addEventListener("click", () => {
        this.buttonsPayElement.forEach((btn) =>
          btn.classList.remove("button_alt-active"),
        );
        button.classList.add("button_alt-active");

        this.events.emit("order:change", {
          payment: button.name,
        });
      }),
    );

    // ввод адреса
    this.imputAddress.addEventListener("input", () => {
      this.events.emit("order:change", {
        address: this.imputAddress.value,
      });
    });

    // submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.events.emit("order:submit");
    });
  }
}
