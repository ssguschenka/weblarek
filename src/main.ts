import { Catalog } from "./components/Models/Catalog";
import { IProduct } from "./types";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/base/LarekApi";
import { Api } from "./components/base//Api";
import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { apiProducts } from "./utils/data";
import { API_URL } from "./utils/constants";
import { Component } from "./components/base/Component";
import { CDN_URL } from "./utils/constants";
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
import { cloneTemplate, ensureElement } from "./utils/utils";
import { categoryMap } from "./utils/constants";
const header = ensureElement<HTMLElement>(".header");
const gallerey = ensureElement<HTMLElement>(".gallery")!;
const modalContainer = ensureElement<HTMLElement>(".modal");
const templCardCatalog = ensureElement<HTMLTemplateElement>("card-catalog");
const templCardPreview = ensureElement<HTMLTemplateElement>("card-preview");
const templCardBasket = ensureElement<HTMLTemplateElement>("card-basket");
const templBasket = ensureElement<HTMLTemplateElement>("basket");
const templOrder = ensureElement<HTMLTemplateElement>("order");
const templContacts = ensureElement<HTMLTemplateElement>("contacts");
const templSuccess = ensureElement<HTMLTemplateElement>("success");
const emitter = new EventEmitter();
const catalog = new Catalog(emitter);
const basket = new Basket(emitter);
const buyer = new Buyer(emitter);
const gallereyView = new GаlleryView(gallerey);
const modal = new ModalView(modalContainer);


//Шапка сайта
const headerView = new HeaderView(header, () => {
  const products = basket.getProducts().map((product, index) => {
    const card = new CardBasketView(
      cloneTemplate<HTMLElement>(templCardBasket),
      () => basket.deleteItem(product),
    );

    card.setTitle(product.title);
    card.setIndex(index + 1);
    card.setPrice(product.price);

    return card.render();
  });

  const basketView = new BasketView(
    cloneTemplate<HTMLElement>(templBasket),
    () => {
      emitter.emit("basket:open");
    },
  );
  modal.open(basketView.render(products, basket.getPriceProducts()));
  basketView.setSubmitDisabled(basket.getCount() === 0);
});

// Подписка на событие обновления каталога
emitter.on("catalog: changed", () => {
  const products = catalog.getProducts().map((product) => {
    const elem = cloneTemplate<HTMLElement>(templCardCatalog);

    //создание карточек в каталоге товаров
    const card = new CardCatalogView(
      elem,
      () => {
        catalog.saveItem(product);

        const cardPv = new CardPreviewView(
          cloneTemplate<HTMLElement>(templCardPreview),
        );
        cardPv.setText(product.description);
        cardPv.setCategory(product.category);
        cardPv.setImageEl(`${CDN_URL}${product.image}`, product.title);
        cardPv.setTitle(product.title);
        cardPv.setPrice(product.price);

        const cardBasket = basket.hasItem(product.id); // есть ли товар в корзине
        const button = (cardPv as any).buttonElement;
        // если товар уже есть в корзине
        //меняем текст на кнопке
        if (button) {
          button.textContent = cardBasket ? "Удалить из корзины" : "Купить";
        }

        // Кнопка удаления/добавления товара в корзину
        cardPv.onClick(() => {
          const cardBasket = basket.hasItem(product.id);
          cardBasket ? basket.deleteItem(product) : basket.addItem(product);
          modal.close(); //сразу после нажатия кнопки закрываем модальное окно
        });
        modal.open(cardPv.render());
      },
      () => {
        const cardBasket = basket.hasItem(product.id);
        cardBasket ? basket.deleteItem(product) : basket.addItem(product);
      }
    );

    card.setTitle(product.title);
    card.setImageEl(`${CDN_URL}${product.image}`, product.title);
    card.setCategory(product.category);
    card.setPrice(product.price);

    return card.render();
  });

  gallereyView.renderCatalog(products);
});


// Подписка на обновление корзины 
emitter.on('basket:chenge', () => {
  const products = basket.getProducts().map((product, index) => {
    const element = cloneTemplate<HTMLElement>(templBasket);

    const elementRow = new CardBasketView(element, () => {
      basket.deleteItem(product);
    });
    elementRow.setIndex(index + 1);
    elementRow.setPrice(product.price);
    elementRow.setTitle(product.title);
    return elementRow.render();
  });
  const basketView = new BasketView(
    cloneTemplate<HTMLElement>(templBasket),
    () => {
      emitter.emit("basket:open");
    });

    basketView.render(products, basket.getPriceProducts());
    basketView.setSubmitDisabled(basket.getPriceProducts() === 0);
    headerView.setCounter(basket.getCount());
});




emitter.on("order:change", (data) => {
  console.log("Изменение формы:", data);
});

emitter.on("order:submit", () => {
  console.log("Форма отправлена");
});

const formElement = document.querySelector("#order-form") as HTMLFormElement;

const form = new OrderView(formElement, emitter);

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi
  .getProductList()
  .then((items) => {
    catalog.saveProducts(items);
    console.log(
      "Список товаров, полученных от сервера :",
      catalog.getProducts(),
    );
  })
  .catch((error) => console.error(error));
