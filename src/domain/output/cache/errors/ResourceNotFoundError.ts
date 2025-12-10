export class ResourceNotFoundError extends Error {
  constructor(resouceKey: string) {
    super(`Resource with key ${resouceKey} not found in cache storage.`)
  }
}