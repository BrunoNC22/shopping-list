export class Categoria {
  private _id: string
  private _nome: string

  constructor(id: string, nome: string) {
    this._id = id
    this._nome = nome
  }

  get id(): string {
    return this._id
  }

  get nome(): string {
    return this._nome
  }

  set nome(novoNome: string) {
    this._nome = novoNome
  }
}