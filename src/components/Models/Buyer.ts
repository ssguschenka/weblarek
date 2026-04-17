import { IBuyer } from "../../types";
import { EventEmitter } from "../base/Events";
import { TPayment } from "../../types";

export class Buyer {
  private payment: IBuyer["payment"] = "";
  private address: string = "";
  private phone: string = "";
  private email: string = "";

  private events: EventEmitter;

  constructor(events: EventEmitter) {
    this.events = events;
  }

  /**
   * сохранениe данных покупателя
   * @param data - вводимые данные
   */
  saveBuyer(data: Partial<IBuyer>): void {
    if (data.payment !== undefined) {
      this.payment = data.payment;
    }
    if (data.address !== undefined) {
      this.address = data.address;
    }
    if (data.phone !== undefined) {
      this.phone = data.phone;
    }
    if (data.email !== undefined) {
      this.email = data.email;
    }

    this.events.emit('buyer:changed', this.getBuyer())
  }

  //получениe всех данных покупателя
  getBuyer(): IBuyer {
    return {
      payment: this.payment,
      address: this.address,
      email: this.email,
      phone: this.phone,
    };
  }

  //очисткa данных покупателя
  clearBuyer(): void {
    this.payment = "";
    this.address = "";
    this.phone = "";
    this.email = "";
    this.events.emit('buyer:changed', this.getBuyer())
  }

  //проверкa валидности данных
  validateBuyer(): Partial<Record<keyof IBuyer, string>> {
    const errors: Partial<Record<keyof IBuyer, string>> = {};

    if (!this.payment) {
      errors.payment = "Не выбран вид оплаты";
    }

    if (!this.address) {
      errors.address = "Введите адрес";
    }

    if (!this.email) {
      errors.email = "Укажите емэйл";
    }

    if (!this.phone) {
      errors.phone = "Укажите номер телефона";
    }

    return errors;
  }


  public setPayment(payment: TPayment): void {
        this.payment = payment;
        this.events?.emit('buyer:changed', this.getBuyer());
    }

    public setAddress(address: string): void {
        this.address = address;
        this.events?.emit('buyer:changed', this.getBuyer());
    }

    public setPhone(phone: string): void {
        this.phone = phone;
        this.events?.emit('buyer:changed', this.getBuyer());
    }

    public setEmail(email: string): void {
        this.email = email;
        this.events?.emit('buyer:changed', this.getBuyer());
    }
}
