import type { Categoria } from "./Categoria"

export default class Item {
  private readonly _id: string
  private _name: string = ""
  private _price: number = 0
  private _amount: number = 0
  private _checked: boolean = false
  private _category: Categoria

  constructor(
    id: string,
    name: string,
    price: number,
    amount: number,
    categoria: Categoria,
    checked: boolean = false
  ) {
    this._id = id
    this.name = name
    this.price = price
    this.amount = amount
    this._category = categoria
    this.checked = checked
  }

  get id(): string {
    return this._id
  }

  get name(): string {
    return this._name;
  }

  get price(): number {
    return this._price;
  }

  get amount(): number {
    return this._amount;
  }

  get checked(): boolean {
    return this._checked
  }

  get category(): Categoria {
    return this._category
  }

  set checked(newChecked: boolean) {
    this._checked = newChecked
  }

  set name(newName: string) {
    if (!newName.trim()) {
      throw new Error("Name cannot be empty.");
    }
    this._name = newName.trim();
  }

  set price(newPrice: number) {
    if (newPrice < 0) {
      throw new Error("Price cannot be negative.");
    }
    this._price = newPrice;
  }

  set amount(newAmount: number) {
    if (newAmount < 0) {
      throw new Error("Amount cannot be empty.");
    }
    this._amount = newAmount;
  }

  set category(newCategory: Categoria) {
    this._category = newCategory
  }
}
