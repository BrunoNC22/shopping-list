export type DeleteItemListProps = {
  itemListId: string
}

export interface DeleteItemListInputPort {
  perform: (props: DeleteItemListProps) => Promise<void>
}