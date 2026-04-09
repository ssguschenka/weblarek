
export class SuccessView {
    private titleElement: HTMLElement;
    private textElement: HTMLElement;
    private buttonElement: HTMLButtonElement;


    constructor(container: HTMLElement, onClose: () => void) {
        this.titleElement = container.querySelector('.order-success__title')!;
        this.textElement = container.querySelector('.order-success__description')!;
        this.buttonElement = container.querySelector('.order-success__close')!;

        this.buttonElement.addEventListener('click', () => {
            onClose();
        })
    }


    setTitle(value: string) {
        this.titleElement.textContent = value;
    }

    setText(value: string) {
        this.textElement.textContent = value;
    }
}