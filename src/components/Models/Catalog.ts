import { IProduct } from "../../../types";

export class Catalog {
  private products: IProduct[] = [];
  private item: IProduct | null = null; // выбранный товар

  constructor() {}

  /**
   * сохранениe массива товаров
   * @param products - массив товаров вида IProduct
   */
  saveProducts(products: IProduct[]): void {
    this.products = products;
  }

  // получениe массива товаров из каталога
  getProducts(): IProduct[] {
    return this.products;
  }

  /**
   * получениe товара по его id
   * @param id - ID товара
   */
  getItemById(id: string): IProduct | undefined {
    return this.products.find((elem) => elem.id === id);
  }

  /**
   *  сохранение выбранного товара
   * @param item
   */
  saveItem(item: IProduct): void {
    this.item = item;
  }

  //получение товара для подробного отображения
  getItem(): IProduct | null {
    return this.item;
  }
}
