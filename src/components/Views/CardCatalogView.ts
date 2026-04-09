import { CardView } from "./CardView";

export class CardCatalogView extends CardView {
  constructor(container: HTMLElement, onOpen: () => void) {
    super(container);
    container.addEventListener("click", (e) => {
      if (e.target as HTMLElement) {
        onOpen();
      }
    });
  }
}
