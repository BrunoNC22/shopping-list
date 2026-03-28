export type AuthenticateUserProps = {
  token?: string
}

export interface AuthenticateUserInputPort {
  perform(props: AuthenticateUserProps): Promise<void>
}