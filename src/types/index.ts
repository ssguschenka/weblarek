
export type ApiPostMethods = "POST" | "PUT" | "DELETE";
export type TPayment = "card" | "cash" | "";
type Category =
  | "софт-скил"
  | "хард-скил"
  | "кнопка"
  | "дополнительное"
  | "другое";

export interface IApi {
  get<T extends object>(uri: string): Promise<T>;
  post<T extends object>(
    uri: string,
    data: object,
    method?: ApiPostMethods,
  ): Promise<T>;
}


export interface IProduct {
  id: string;
  title: string;
  image: string;
  category: Category;
  price: number | null;
  description: string;
}

export interface IBuyer {
  payment: TPayment;
  address: string;
  email: string;
  phone: string;
}

export interface IOrder {
  items: string[];
    total: number;
    payment: TPayment;
    email: string;
    phone: string;
    address: string;
}

export interface IResponseOrder {
  id: string;
  total: number;
  message: string;
}

export interface IOrderProducts {
  items: [];
  total: number;
}


export interface IEvents {
  emit<T extends object>(eventName: string, data?: T): void;
}