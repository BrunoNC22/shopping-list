export type DeleteItemProps = {
  itemId: string
}

export default interface DeleteItemInputPort {
  perform(props: DeleteItemProps): Promise<void>
}