type ToggleIsCheckedProps = {
  itemId: string
}

export interface ToggleIsCheckedInputPort {
  perform(props: ToggleIsCheckedProps): Promise<void>
}