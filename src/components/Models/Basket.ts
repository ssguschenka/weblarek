import { IProduct } from "../../../types";

export class Basket {
  private products: IProduct[] = [];

  constructor() {}

  //получениe массива товаров в корзине
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * добавлениe товара в корзину
   * @param item - выбранный товар
   */
  addItem(item: IProduct): void {
    this.products.push(item);
  }

  /**
   * удалениe товара из корзины
   * @param item - выбранный товар
   */
  deleteItem(item: IProduct): void {
    const index = this.products.indexOf(item);
    if (index > -1) {
      this.products.splice(index, 1);
    }
  }

  //очистка корзины
  clearBasket(): void {
    this.products = [];
  }

  //получениe стоимости всех товаров в корзине
  getPriceProducts(): number {
    return this.products.reduce((sum, item) => sum + (item.price ?? 0), 0);
  }

  // получениt количества товаров в корзине
  getCount(): number {
    return this.products.length;
  }

  /**
   * проверка наличия товара в корзине по его id
   * @param id - ID товара
   */
  hasItem(id: string): boolean {
    return this.products.some((item) => item.id === id);
  }
}
