
export type GetTotalByCategoryResponseItem = {
  categoryName: string,
  total: number
}

export type GetTotalByCategoryProps = {
  itemListId: string
}

export interface GetTotalByCategoryInputPort {
  perform(props: GetTotalByCategoryProps): Promise<GetTotalByCategoryResponseItem[]>
}