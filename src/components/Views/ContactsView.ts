import { FormView } from "./FormView";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../types";
import { IBuyer } from "../../types";

export type TContacts = Pick<IBuyer, "phone" | "email">;

export class ContactsView extends FormView<TContacts> {
  private inputРhone: HTMLInputElement;
  private inputЕmail: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    protected events: IEvents,
  ) {
    super(form, events, "contacts:submit");

    this.inputЕmail = ensureElement<HTMLInputElement>(
      '[name="email"]',
      this.container,
    );
    this.inputРhone = ensureElement<HTMLInputElement>(
      '[name="phone"]',
      this.container,
    );

    this.inputЕmail.addEventListener("input", () => {
      this.events.emit("form:email", { email: this.inputЕmail.value });
    });

    this.inputРhone.addEventListener("input", () => {
      this.events.emit("form:phone", { phone: this.inputРhone.value });
    });
  }

  // Метод установки телефона покупателя
  set phone(value: string) {
    this.inputРhone.value = value;
  }

  // Метод установки почты покупателя
  set email(value: string) {
    this.inputЕmail.value = value;
  }
}
