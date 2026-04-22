import { Catalog } from "./components/Models/Catalog";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/base/LarekApi";
import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { IProduct } from "./types";
import { API_URL } from "./utils/constants";
import { GalleryView } from "./components/Views/GalleryView";
import { CardCatalogView } from "./components/Views/CardCatalogView";
import { ModalView } from "./components/Views/ModalView";
import { CardPreviewView } from "./components/Views/CardPreviewView";
import { HeaderView } from "./components/Views/HeaderView";
import { BasketView } from "./components/Views/BasketView";
import { CardBasketView } from "./components/Views/CardBasketView";
import { OrderView } from "./components/Views/OrderView";
import { ContactsView } from "./components/Views/ContactsView";

import { cloneTemplate, ensureElement } from "./utils/utils";

const gallerey = ensureElement<HTMLElement>(".gallery");
const templCardCatalog = ensureElement<HTMLTemplateElement>("#card-catalog");
const modalContainer = ensureElement<HTMLElement>(".modal");
const templCardPreview = ensureElement<HTMLTemplateElement>("#card-preview");
const headerEll = ensureElement<HTMLElement>(".header");
const templBasket = ensureElement<HTMLTemplateElement>("#basket");
const templCardBasket = ensureElement<HTMLTemplateElement>("#card-basket");
const templOrder = ensureElement<HTMLTemplateElement>("#order");
const templContacts = ensureElement<HTMLTemplateElement>("#contacts");

const emitter = new EventEmitter();
const catalog = new Catalog(emitter);
const basket = new Basket(emitter);
const buyer = new Buyer(emitter);
const gallereyView = new GalleryView(gallerey);
const modal = new ModalView(modalContainer, emitter);
const header = new HeaderView(headerEll, emitter);
const basketView = new BasketView(
  cloneTemplate<HTMLElement>(templBasket),
  emitter,
);
const orderView = new OrderView(
  cloneTemplate<HTMLFormElement>(templOrder),
  emitter,
);
const contactsView = new ContactsView(
  cloneTemplate<HTMLFormElement>(templContacts),
  emitter,
);

//Изменение каталога
emitter.on("catalog:changed", () => {
  const products = catalog.getProducts().map((product) => {
    const card = new CardCatalogView(
      cloneTemplate<HTMLElement>(templCardCatalog),
      { onClick: () => emitter.emit("card:select", product) },
    );

    return card.render(product);
  });
  gallereyView.render({ catalog: products });
});

//Клик по карточке товара
emitter.on("card:select", (product: IProduct) => {
  catalog.saveItem(product);
});

//изменение выбранного для просмотра товара
emitter.on("product:changed", (product: IProduct) => {
  const cardPrev = new CardPreviewView(
    cloneTemplate<HTMLElement>(templCardPreview),
    {
      onClick: () => {
        emitter.emit("product:basket", product);
      },
    },
  );

  if (product.price === null) {
    cardPrev.disabled = true;
    cardPrev.button = "Недоступно";
  } else {
    cardPrev.button = "Купить";
  }

  if (basket.hasItem(product.id)) {
    cardPrev.button = "Удалить из корзины";
  }
  modal.open(cardPrev.render(product));
});

//Закрытие модального окна
emitter.on("modal:closed", () => {
  modal.close();
});

//Открытие корзины
emitter.on("basket:open", () => {
  basketView.submitDisabled = basket.getCount() === 0;
  modal.open(basketView.render());
});

//Добавить товар в корзину или удалить
emitter.on("product:basket", (product: IProduct) => {
  if (basket.hasItem(product.id)) {
    basket.deleteItem(product);
  } else {
    basket.addItem(product);
  }
});

//Изменнение корзины
emitter.on("basket:changed", () => {
  header.counter = basket.getCount();
  header.render();

  const products = basket.getProducts().map((product, index) => {
    const card = new CardBasketView(
      cloneTemplate<HTMLElement>(templCardBasket),
      {
        onClick: () => {
          emitter.emit("product:delete", product);
        },
      },
    );

    card.index = index + 1;
    return card.render(product);
  });

  basketView.items = products;
  basketView.price = basket.getPriceProducts();
  basketView.submitDisabled = basket.getCount() === 0;

  basketView.render();
});

//Удалить товар из корзины
emitter.on("product:delete", (product: IProduct) => {
  basket.deleteItem(product);
});

//Оформить покупку
emitter.on("products:buy", () => {
  modal.open(orderView.render());
});

//Выбор оплаты
emitter.on("button:payment", (payment) => {
  buyer.saveBuyer(payment);
});

//Ввод адреса
emitter.on("form:address", (address) => {
  buyer.saveBuyer(address);
});

//открытие окна контактов
emitter.on("order:submit", () => {
  modal.open(contactsView.render());
});

//ввод почты
emitter.on("form:email", (email) => {
  buyer.saveBuyer(email);
});

//ввод номера телефона
emitter.on("form:phone", (phone) => {
  buyer.saveBuyer(phone);
});

//Изменение данных покупателя
emitter.on("buyer:changed", () => {
  orderView.pay = buyer.getBuyer().payment;
  orderView.address = buyer.getBuyer().address;

  const allErrors = buyer.validateBuyer();
  const errorsOrder = Object.fromEntries(
    Object.entries({
      payment: allErrors.payment,
      address: allErrors.address,
    }).filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;

  orderView.errors = errorsOrder;

  orderView.disabled = Object.keys(errorsOrder).length > 0;

  orderView.render();

  contactsView.email = buyer.getBuyer().email;
  contactsView.phone = buyer.getBuyer().phone;

  const errorsContacts = Object.fromEntries(
    Object.entries({
      email: allErrors.email,
      phone: allErrors.phone,
    }).filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;

  contactsView.errors = errorsContacts;
  contactsView.disabled = Object.keys(errorsContacts).length > 0;
  contactsView.render();
});

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi
  .getProductList()
  .then((items) => {
    catalog.saveProducts(items);
    console.log(items);
  })
  .catch((error) => console.error(error));
