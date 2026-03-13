export type GetUserInformationProps = {
  token: string
}

export interface GetUserInformationInputPort {
  perform(props: GetUserInformationProps): Promise<void>
}