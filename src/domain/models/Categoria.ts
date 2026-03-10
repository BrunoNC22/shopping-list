import { BaseModel } from "./BaseModel"

export class Categoria extends BaseModel {
  private _nome: string

  constructor(id: string, nome: string) {
    super(id)
    this._nome = nome
  }

  get nome(): string {
    return this._nome
  }

  set nome(novoNome: string) {
    this._nome = novoNome
  }
}