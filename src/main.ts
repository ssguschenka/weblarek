import { Catalog } from "./components/Models/Catalog";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/base/LarekApi";
import { Api } from "./components/base//Api";
import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Component } from "./components/base/Component";

import { HeaderView } from "./components/Views/HeaderView";
import { GаlleryView } from "./components/Views/GalleryView";
import { CardView } from "./components/Views/CardView";
import { CardBasketView } from "./components/Views/CardBasketView";
import { CardCatalogView } from "./components/Views/CardCatalogView";
import { CardPreviewView } from "./components/Views/CardPreviewView";
import { ModalView } from "./components/Views/ModalView";
import { SuccessView } from "./components/Views/SuccessView";
import { BasketView } from "./components/Views/BasketView";
import { FormView } from "./components/Views/FormView";
import { OrderView } from "./components/Views/OrderView";

const emitter = new EventEmitter();

emitter.on("order:change", (data) => {
  console.log("Изменение формы:", data);
});

emitter.on("order:submit", () => {
  console.log("Форма отправлена");
});

const formElement = document.querySelector('#order-form') as HTMLFormElement;

const form = new OrderView(formElement, emitter);








const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi.getProductList().then((items) => {
    productsModel.saveProducts(items);
    console.log("Список товаров, полученных от сервера :", productsModel.getProducts());
}).catch((error) => console.error(error));
