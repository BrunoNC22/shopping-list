export type CreateItemListProps = {
  userId: string
  listName: string
}

export interface CreateItemListInputPort {
  perform(props: CreateItemListProps): Promise<void>
}