import { Catalog } from "./components/Models/Catalog";
import { LarekApi } from "./components/base/LarekApi";
import "./scss/styles.scss";
import { Api } from "./components/base/Api";
import { EventEmitter } from "./components/base/Events";
import { API_URL } from "./utils/constants";
import { GalleryView } from "./components/Views/GalleryView";
import { CardCatalogView } from "./components/Views/CardCatalogView";

import { cloneTemplate, ensureElement } from "./utils/utils";

const gallerey = ensureElement<HTMLElement>(".gallery");
const templCardCatalog = ensureElement<HTMLTemplateElement>("#card-catalog");
const emitter = new EventEmitter();
const catalog = new Catalog(emitter);
const gallereyView = new GalleryView(gallerey);


//Изменение каталога
emitter.on("catalog:changed", () => {
  const products = catalog.getProducts().map((product) => {
    const card = new CardCatalogView(
      cloneTemplate<HTMLElement>(templCardCatalog),
      { onClick: () =>  emitter.emit("card:select", product)}
    );
    
    return card.render(product);
  });
  gallereyView.render({ catalog: products });
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
