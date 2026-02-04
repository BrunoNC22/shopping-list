export type EditItemProps = {
  itemId: string,
  itemListId: string
  name?: string,
  value?: number,
  amount?: number,
  categoryId?: string
}

export interface EditIntemInputPort {
  perform(props: EditItemProps): Promise<void>
}