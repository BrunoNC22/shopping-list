export type GoogleLoginProps = {
  googleCode: string
}

export interface GoogleLoginInputPort {
  perform(props: GoogleLoginProps): Promise<void>
}