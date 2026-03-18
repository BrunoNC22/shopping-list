export class CategoryNotFoundError extends Error {
  constructor(message: string) {
    super(message)
  }
}