import { Categoria } from "@/models"

export type ReplaceCategoriesProps = {
  categories: Categoria[]
}

export interface ReplaceCategoriesInputPort {
  perform(props: ReplaceCategoriesProps): Promise<void>
}