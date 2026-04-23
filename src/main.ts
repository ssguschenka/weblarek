import { Catalog } from "./components/Models/Catalog";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/base/LarekApi";
import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { IProduct } from "./types";
import { IBuyer } from "./types";
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
import { SuccessView } from "./components/Views/SuccessView";

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
const templSuccess = ensureElement<HTMLTemplateElement>("#success");

const emitter = new EventEmitter();
const catalogModel = new Catalog(emitter);
const basketModel = new Basket(emitter);
const buyerModel = new Buyer(emitter);
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
const successView = new SuccessView(cloneTemplate<HTMLElement>(templSuccess), emitter)

//Изменение каталога
emitter.on("catalog:changed", () => {
  const products = catalogModel.getProducts().map((product) => {
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
  catalogModel.saveItem(product);
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

  if (basketModel.hasItem(product.id)) {
    cardPrev.button = "Удалить из корзины";
  }

  cardPrev.text = product.description;
  modal.open(cardPrev.render(product));
});

//Закрытие модального окна
emitter.on("modal:closed", () => {
  modal.close();
});

//Открытие корзины
emitter.on("basket:open", () => {
  basketView.submitDisabled = basketModel.getCount() === 0;
  modal.open(basketView.render());
});

//Добавить товар в корзину или удалить
emitter.on("product:basket", (product: IProduct) => {
  if (basketModel.hasItem(product.id)) {
    basketModel.deleteItem(product);
  } else {
    basketModel.addItem(product);
  }
});

//Изменнение корзины
emitter.on("basket:changed", () => {
  header.counter = basketModel.getCount();
  header.render();

  const products = basketModel.getProducts().map((product, index) => {
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
  basketView.price = basketModel.getPriceProducts();
  basketView.submitDisabled = basketModel.getCount() === 0;

  basketView.render();
  
});

//Удалить товар из корзины
emitter.on("product:delete", (product: IProduct) => {
  basketModel.deleteItem(product);
});

//Оформить покупку
emitter.on("products:buy", () => {
  modal.open(orderView.render());
});

//Выбор оплаты
emitter.on("button:payment", (payment) => {
  buyerModel.saveBuyer(payment);
});

//Ввод адреса
emitter.on("form:address", (address) => {
  buyerModel.saveBuyer(address);
});

//открытие окна контактов
emitter.on("order:submit", () => {
  modal.open(contactsView.render());
});

//ввод почты
emitter.on("form:email", (email) => {
  buyerModel.saveBuyer(email);
});

//ввод номера телефона
emitter.on("form:phone", (phone) => {
  buyerModel.saveBuyer(phone);
});

//Изменение данных покупателя
emitter.on("buyer:changed", () => {
  const data = buyerModel.getBuyer();
  const allErrors = buyerModel.validateBuyer();

  renderOrderView(data, allErrors)
  renderContactsView(data, allErrors)
});

function renderOrderView(data: IBuyer, allErrors: Partial<Record<keyof IBuyer, string>>) {
  orderView.pay = data.payment;
  orderView.address = data.address;

  const errorsOrder = Object.fromEntries(
    Object.entries({
      payment: allErrors.payment,
      address: allErrors.address,
    }).filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;

  orderView.errors = errorsOrder;
  orderView.disabled = Object.keys(errorsOrder).length > 0;
  orderView.render();
}

function renderContactsView(data: IBuyer, allErrors: Partial<Record<keyof IBuyer, string>>) {
  contactsView.email = data.email;
  contactsView.phone = data.phone;

  const errorsContacts = Object.fromEntries(
    Object.entries({
      email: allErrors.email,
      phone: allErrors.phone,
    }).filter(([, value]) => Boolean(value)),
  ) as Record<string, string>;

  contactsView.errors = errorsContacts;
  contactsView.disabled = Object.keys(errorsContacts).length > 0;
  contactsView.render();
}


// открытие окна оформленного заказа
emitter.on("contacts:submit", async() => {
  try {
    const order = { 
      items: basketModel.getProducts().map((product) => product.id), 
      total: basketModel.getPriceProducts(), 
      ...buyerModel.getBuyer(), 
    };
    
    const res = await larekApi.postOrder(order);
    successView.text = `Списано ${res.total} синапсов`;
    modal.open(successView.render())
    basketModel.clearBasket();
    buyerModel.clearBuyer();
    
  } catch (error) {
    console.error(error);
  }
  
})



const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi
  .getProductList()
  .then((items) => {
    catalogModel.saveProducts(items);
    console.log(items);
  })
  .catch((error) => console.error(error));
