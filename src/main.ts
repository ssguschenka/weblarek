import { Catalog } from "./components/base/Models/Catalog";
import { Basket } from "./components/base/Models/Basket";
import { Buyer } from "./components/base/Models/Buyer";
import { Order } from "./components/base/Order";
import { Api } from "./components/base//Api";
import "./scss/styles.scss";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";

let productsModel = new Catalog();

productsModel.saveProducts(apiProducts.items);

console.log("Массив товаров из каталога: ", productsModel.getProducts());
console.log(
  "получениe товара по его id: ",
  productsModel.getItemById("854cef69-976d-4c2a-a18c-2aa45046c390"),
);
productsModel.saveItem(apiProducts.items[2]); //сохранение выбранного товара
console.log(
  "получение товара для подробного отображения: ",
  productsModel.getItem(),
);

const basketModel = new Basket();

basketModel.addItem(apiProducts.items[0]);
basketModel.addItem(apiProducts.items[1]);
console.log("получениe массива товаров в корзине: ", basketModel.getProducts());
console.log(
  "стоимость всех товаров в корзине: ",
  basketModel.getPriceProducts(),
);
console.log("количествo товаров в корзине: ", basketModel.getCount());
console.log(
  "проверка наличия товара в корзине по его id: ",
  basketModel.hasItem("854cef69-976d-4c2a-a18c-2aa45046c391"),
);
basketModel.deleteItem(apiProducts.items[1]); //удалениe товара из корзины
console.log("получениe массива товаров в корзине: ", basketModel.getProducts());
basketModel.clearBascet(); //Очистка корзины
console.log("получениe массива товаров в корзине: ", basketModel.getProducts());

const person = {
  payment: undefined,
  address: "Ural",
  email: "sobaka@mail.ru",
  phone: "+79993434999",
};
const byuer = new Buyer();

byuer.saveBuyer(person); //сохраняем донные покупателя
console.log("получениe всех данных покупателя: ", byuer.getBuyer());
console.log("проверкa валидности данных:", byuer.validateBuyer());
byuer.clearBuyer(); // очистка данных покупателя
console.log("получениe всех данных покупателя: ", byuer.getBuyer());

const api = new Api(API_URL);
const ord = new Order(api);
productsModel.saveProducts(await ord.getProductList());
console.log(
  "Список товаров, полученных от сервера :",
  productsModel.getProducts(),
);
