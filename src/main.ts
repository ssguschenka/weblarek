import { Catalog } from "./components/Models/Catalog";
import { Basket } from "./components/Models/Basket";
import { Buyer } from "./components/Models/Buyer";
import { LarekApi } from "./components/base/LarekApi";
import { Api } from "./components/base//Api";
import "./scss/styles.scss";
import { EventEmitter } from "./components/base/Events";
import { API_URL } from "./utils/constants";
import { CDN_URL } from "./utils/constants";
import { HeaderView } from "./components/Views/HeaderView";
import { GаlleryView } from "./components/Views/GalleryView";
import { CardBasketView } from "./components/Views/CardBasketView";
import { CardCatalogView } from "./components/Views/CardCatalogView";
import { CardPreviewView } from "./components/Views/CardPreviewView";
import { ModalView } from "./components/Views/ModalView";
import { SuccessView } from "./components/Views/SuccessView";
import { BasketView } from "./components/Views/BasketView";
import { OrderView } from "./components/Views/OrderView";
import { cloneTemplate, ensureElement } from "./utils/utils";
import { ContactsView } from "./components/Views/ContactsView";
import { IProduct } from "./types";
const header = ensureElement<HTMLElement>(".header");
const gallerey = ensureElement<HTMLElement>(".gallery")!;
const modalContainer = ensureElement<HTMLElement>(".modal");
const templCardCatalog = ensureElement<HTMLTemplateElement>("#card-catalog");
const templCardPreview = ensureElement<HTMLTemplateElement>("#card-preview");
const templCardBasket = ensureElement<HTMLTemplateElement>("#card-basket");
const templBasket = ensureElement<HTMLTemplateElement>("#basket");
const templOrder = ensureElement<HTMLTemplateElement>("#order");
const templContacts = ensureElement<HTMLTemplateElement>("#contacts");
const templSuccess = ensureElement<HTMLTemplateElement>("#success");
const emitter = new EventEmitter();
const catalog = new Catalog(emitter);
const basket = new Basket(emitter);
const buyer = new Buyer(emitter);
const gallereyView = new GаlleryView(gallerey);
const modal = new ModalView(modalContainer);

//Шапка сайта
//Открытие корзины
emitter.on("basket:open", () => {
  const products = basket.getProducts().map((product, index) => {
    const card = new CardBasketView(
      cloneTemplate<HTMLElement>(templCardBasket),
      () => {
        basket.deleteItem(product);
        emitter.emit("basket:change"); // перерисовать cчетчик
        emitter.emit("basket:open"); // перерисовать саму корзину
      },
    );

    card.setTitle(product.title);
    card.setIndex(index + 1);
    card.setPrice(product.price);

    return card.render();
  });

  const basketView = new BasketView(
    cloneTemplate<HTMLElement>(templBasket),
    () => {
      emitter.emit("order:change");
    },
  );
  // открываем модальное окно корзины
  modal.open(basketView.render(products, basket.getPriceProducts()));
  basketView.setSubmitDisabled(basket.getCount() === 0); //если в корзине нет товаров - кнопка не кликабельна
});

//Обновление счетчика корзины
emitter.on("basket:change", () => {
  headerView.setCounter(basket.getCount());
});

//Открытие корзины
const headerView = new HeaderView(header, () => {
  emitter.emit("basket:open");
});

// Подписка на событие обновления каталога
emitter.on("catalog:change", () => {
  //создвем массив, который будет хранить все карточки товаров в каталоге на странице
  const products = catalog.getProducts().map((product) => {
    const elem = cloneTemplate<HTMLElement>(templCardCatalog);

    //создание карточек в каталоге товаров
    const card = new CardCatalogView(
      elem,
      () => {
        emitter.emit("product:open", product); // при клике на карточку открываем предосмотр товара
      },
      //Добавить или удалить товар из корзины
      () => {
        const cardBasket = basket.hasItem(product.id);
        cardBasket ? basket.deleteItem(product) : basket.addItem(product);

        emitter.emit("basket:change"); //обновляем счетчик
      },
    );
    card.setTitle(product.title);
    card.setImageEl(`${CDN_URL}${product.image}`, product.title);
    card.setCategory(product.category);
    card.setPrice(product.price);

    return card.render();
  });
  gallereyView.renderCatalog(products);
});

//Открытие карточки товара
emitter.on("product:open", (product: IProduct) => {
  const cardPv = new CardPreviewView(
    cloneTemplate<HTMLElement>(templCardPreview),
  );
  // установка всех полей карточки товара
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
    if (basket.hasItem(product.id)) {
      basket.deleteItem(product);
      modal.close(); //сразу после нажатия кнопки закрываем модальное окно
    } else {
      basket.addItem(product);
      modal.close(); //сразу после нажатия кнопки закрываем модальное окно
    }

    //Перересовываем кнопку сразу после нажатия на нее
    // const updatedState = basket.hasItem(product.id);
    // if (button) {
    //   button.textContent = updatedState ? "Удалить из корзины" : "Купить";
    // }

    emitter.emit("basket:change"); //обновляем счетчик
  });
  modal.open(cardPv.render()); //открываем модальное окно с карточкой выбранного товаара
});

//Подписка на обновления заказа
emitter.on("order:change", () => {
  const order = cloneTemplate<HTMLElement>(templOrder);
  let payment: "card" | "cash" | ""; // для установки способа оплаты
  let address = ""; // для установки адреса
  let email = ""; // для установки почты
  let phone = ""; // для установки телефона

  const form = new OrderView(
    order as HTMLFormElement,
    (data) => {
      if (data.payment) {
        payment = data.payment === "card" ? "card" : "cash";
        buyer.setPayment(payment); //у покупалеля устанавливаем выбранный способ оплаты
      }
      if (data.address) {
        address = data.address;
        buyer.setAddress(address); //у покупалеля устанавливаем выбранный адрес
      }

      const errors: Record<string, string> = {}; //поле для хранения ошибок

      if (!payment) {
        errors.payment = "Не выбран способ оплаты";
      }
      if (!address) {
        errors.address = "Необходимо указать адрес";
      }

      form.setErrors(errors); //Устанавливаем ошибки
      form.setDisabled(Object.keys(errors).length > 0); //Делаем недоступкой кнопку
    },
    () => {
      const contacts = cloneTemplate<HTMLElement>(templContacts);
      const formContacts = new ContactsView(
        contacts as HTMLFormElement,
        (data) => {
          if (data.email) {
            email = data.email;
            buyer.setEmail(email);
          }
          if (data.phone) {
            phone = data.phone;
            buyer.setPhone(phone);
          }

          //Проверка валидности форм
          const errors: Record<string, string> = {};
          if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
            errors.email = "Ошибка в адресе электронной почты";
          }
          if (!phone || !/^\+?\d[\d\s\-()]{6,}$/.test(phone)) {
            errors.phone = "Неправильно введен номер телефона";
          }

          formContacts.setErrors(errors);
          formContacts.setDisabled(Object.keys(errors).length > 0);
        },
        async () => {
          //асинхронная функция, потому что запрашиваем данные у сервера
          try {
            const order = {
              items: basket.getProducts().map((product) => product.id),
              total: basket.getPriceProducts(),
              ...buyer.getBuyer(),
            };

            const res = await larekApi.postOrder(order);

            const success = cloneTemplate<HTMLElement>(templSuccess);
            const successMessage = new SuccessView(success);
            successMessage.setText(`Списано ${res.total} синапсов`);
            basket.clearBasket(); //после успешного заказа очищаем корзину и данные о покупателе + обновляем счетчик
            buyer.clearBuyer();
            emitter.emit("basket:change");

            successMessage.onClose(() => {
              modal.close();
            });

            modal.open(successMessage.render());
          } catch (error) {
            console.error(error);
          }
        },
      );
      formContacts.setDisabled(true);
      modal.open(contacts);
    },
  );
  form.setDisabled(true);
  modal.open(order);
});

const api = new Api(API_URL);
const larekApi = new LarekApi(api);

larekApi
  .getProductList()
  .then((items) => {
    catalog.saveProducts(items);

    emitter.emit("catalog:change");
  })
  .catch((error) => console.error(error));
