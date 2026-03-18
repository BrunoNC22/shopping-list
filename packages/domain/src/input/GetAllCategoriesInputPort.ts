import type { Categoria } from "../models/Categoria";

export interface GetAllCategoriesInputPort {
  perform(): Promise<Categoria[]>
}