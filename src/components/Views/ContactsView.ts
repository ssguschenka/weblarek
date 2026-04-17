import { FormView } from "./FormView";

export class ContactsView extends FormView {
  private inputРhone: HTMLInputElement;
  private inputЕmail: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    onChange: (data: { email?: string; phone?: string }) => void,
    onSubmit: () => void,
  ) {
    super(form);

    this.inputЕmail = form.elements.namedItem("email") as HTMLInputElement;
    this.inputРhone = form.elements.namedItem("phone") as HTMLInputElement;

    this.inputЕmail.addEventListener("input", () => {
      onChange({ email: this.inputЕmail.value });
    });

    this.inputРhone.addEventListener("input", () => {
      onChange({ phone: this.inputРhone.value });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit();
    });
  }
}
