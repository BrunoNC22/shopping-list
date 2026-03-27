export type CreateCategoryProps = {
  categoryName: string
}

export interface CreateCategoryInputPort {
  perform(props: CreateCategoryProps): Promise<string>
}