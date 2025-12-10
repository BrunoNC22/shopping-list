
export type GetTotalByCategoryResponseItem = {
  categoryName: string,
  total: number
}

export interface GetTotalByCategoryInputPort {
  perform(): Promise<GetTotalByCategoryResponseItem[]>
}