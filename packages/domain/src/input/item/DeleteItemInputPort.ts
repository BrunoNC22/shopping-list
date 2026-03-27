export type DeleteItemProps = {
  itemId: string
}

export interface DeleteItemInputPort {
  perform(props: DeleteItemProps): Promise<void>
}