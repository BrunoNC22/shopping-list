export class ItemNotFoundError extends Error {
  constructor(message: string) {
    super(message)
  }
}