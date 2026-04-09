import { IProduct } from "../../types";
import { EventEmitter } from "../base/Events";

export class Catalog {
  private products: IProduct[] = [];
  private item: IProduct | null = null; // выбранный товар
  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  /**
   * сохранениe массива товаров
   * @param products - массив товаров вида IProduct
   */
  saveProducts(products: IProduct[]): void {
    this.products = products;
     this.events.emit('catalog:changed', { products: this.getProducts() });
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
    this.events.emit('catalog:selected', { product: this.item });
  }

  //получение товара для подробного отображения
  getItem(): IProduct | null {
    return this.item;
  }
}
