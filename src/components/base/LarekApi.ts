import {
  IApi,
  IOrder,
  IProduct,
  IResponseOrder,
  IOrderProducts,
} from "../../types";

export class LarekApi {
  obg: IApi;

  constructor(obg: IApi) {
    this.obg = obg;
  }

  //запрос на эндпоинт /product/
  // возвращает объект, полученный от сервера, в котором находится массив товаров
  async getProductList(): Promise<IProduct[]> {
    const products: IOrderProducts = await this.obg.get("/product");
    return products.items;
  }

  /**
   * post запрос на эндпоинт /order/
   *  возвращает объект, подтверждающий покупку на определенную сумму
   * @param order - данные о покупке  и покупателе
   */
  async postOrder(order: IOrder): Promise<IResponseOrder> {
    return await this.obg.post("/order/", order);
  }
}
