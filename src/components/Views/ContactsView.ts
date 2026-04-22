import { FormView } from "./FormView";
import { ensureElement } from "../../utils/utils";
import { IEvents } from "../../types";
import { IBuyer } from "../../types";

export type TContacts = Pick<IBuyer, "phone" | "email" >;

export class ContactsView extends FormView<TContacts> {
  private inputРhone: HTMLInputElement;
  private inputЕmail: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    // onChange: (data: { email?: string; phone?: string }) => void,
    protected events: IEvents
  ) {
    super(form, events);

    this.inputЕmail = ensureElement<HTMLInputElement>("email", this.container);
    this.inputРhone = ensureElement<HTMLInputElement>("phone", this.container);

    this.inputЕmail.addEventListener("input", () => {
      // onChange({ email: this.inputЕmail.value });
      this.events.emit("form:input");
    });

    this.inputРhone.addEventListener("input", () => {
      // onChange({ phone: this.inputРhone.value });
      this.events.emit("form:input");
    });
  }

  set phone(value: string) {
    this.inputРhone.value = value;
  }

  set email(value:string) {
    this.inputЕmail.value = value;
  }
}
