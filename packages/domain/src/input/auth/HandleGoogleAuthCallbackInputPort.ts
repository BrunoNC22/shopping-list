export type HandleGoogleAuthCallbackProps = {
  googleCode: string
}

export interface HandleGoogleAuthCallbackInputPort {
  perform(props: HandleGoogleAuthCallbackProps): Promise<void>
}