type RemoveItemProps = {
  itemId: string
}

export default interface RemoveItemInputPort {
  perform(props: RemoveItemProps): Promise<void>
}