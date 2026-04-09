import { FormView } from "./FormView";
import { EventEmitter } from "../base/Events";

export class ContactsView extends FormView {
  private inputРhone: HTMLInputElement;
  private inputЕmail: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    private events: EventEmitter,
  ) {
    super(form);

    this.inputЕmail = form.elements.namedItem("email") as HTMLInputElement;
    this.inputРhone = form.elements.namedItem("phone") as HTMLInputElement;

    this.inputЕmail.addEventListener("input", () => {
      this.events.emit("order:change", {
        email: this.inputЕmail.value,
      });
    });

    this.inputРhone.addEventListener("input", () => {
      this.events.emit("order:change", {
        phone: this.inputРhone.value,
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      this.events.emit("order:submit");
    });
  }
}
