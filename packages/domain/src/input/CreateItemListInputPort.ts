export type CreateItemListProps = {
  listName: string
}

export interface CreateItemListInputPort {
  perform(props: CreateItemListProps): Promise<void>
}