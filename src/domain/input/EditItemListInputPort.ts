export type EditItemListProps = {
  itemListId: string,
  itemListName?: string
}

export interface EditItemListInputPort {
  perform(props: EditItemListProps): Promise<void>
}