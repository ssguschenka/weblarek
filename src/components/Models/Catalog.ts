import { IProduct } from "../../types";
import { IEvents } from "../../types";

export class Catalog {
  private products: IProduct[] = [];
  private item: IProduct | null = null; // выбранный товар
  private events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  /**
   * сохранениe массива товаров
   * @param products - массив товаров вида IProduct
   */
  saveProducts(products: IProduct[]): void {
    this.products = products;
     this.events.emit('catalog:changed');
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
    this.events.emit('catalog:changed');
  }

  //получение товара для подробного отображения
  getItem(): IProduct | null {
    return this.item;
  }
}
