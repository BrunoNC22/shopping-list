import type Item from "./Item";

export default class ItemList {
  private items: Item[] = []

  constructor(
    items: Item[]
  ) {
    this.items = items
  }

  public getItems(): ReadonlyArray<Item> {
    return this.items
  }

  public addItem(newItem: Item) {
    this.items.push(newItem)
  }

  public removeItem(item: Item) {
    const index = this.items.indexOf(item);
    if (index === -1) {
      throw new Error("Item not found in the list.");
    }
    this.items.splice(index, 1);
  }

  public getTotalValue(): number {
    let sum = 0
    this.items.forEach(item => {
      sum += item.price
    })

    return sum
  }
}