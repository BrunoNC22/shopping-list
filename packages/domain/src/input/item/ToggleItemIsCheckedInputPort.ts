export type ToggleItemIsCheckedProps = {
  itemId: string
}

export interface ToggleItemIsCheckedInputPort {
  perform(props: ToggleItemIsCheckedProps): Promise<void>
}