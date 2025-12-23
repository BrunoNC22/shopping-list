import type Item from "./Item";

export default class ItemList {
  private _items: Item[] = []
  private _name: string
  private _createdAt: Date

  constructor(
    readonly id: string,
    name: string,
    items: Item[],
    createdAt: Date
  ) {
    this._name = name
    this._items = items
    this._createdAt = createdAt
  }

  public get name() {
    return this._name
  }

  public set name(newName: string) {
    this._name = newName
  }

  public get createdAt() {
    return this._createdAt
  }

  public getItems(): ReadonlyArray<Item> {
    return this._items
  }

  public addItem(newItem: Item) {
    this._items.push(newItem)
  }

  public removeItem(item: Item) {
    const index = this._items.indexOf(item);
    if (index === -1) {
      throw new Error("Item not found in the list.");
    }
    this._items.splice(index, 1);
  }

  public getTotalValue(): number {
    let sum = 0
    this._items.forEach(item => {
      sum += item.price
    })

    return sum
  }
}