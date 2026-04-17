import { FormView } from "./FormView";

export class OrderView extends FormView {
  private buttonsPayElement: NodeListOf<HTMLButtonElement>;
  private inputAddress: HTMLInputElement;

  constructor(
    form: HTMLFormElement,
    onChange: (data: { payment?: string; address?: string }) => void,
    onSubmit: () => void,
  ) {
    super(form);

    this.inputAddress = form.elements.namedItem("address") as HTMLInputElement;
    this.buttonsPayElement = form.querySelectorAll(".button_alt")!;

    // выбор оплаты
    this.buttonsPayElement.forEach((button) =>
      button.addEventListener("click", () => {
        this.buttonsPayElement.forEach((btn) =>
          btn.classList.remove("button_alt-active"),
        );
        button.classList.add("button_alt-active");

        onChange({ payment: button.name });
      }),
    );

    // ввод адреса
    this.inputAddress.addEventListener("input", () =>
      onChange({ address: this.inputAddress.value }),
    );

    // submit
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      onSubmit();
    });
  }
}
