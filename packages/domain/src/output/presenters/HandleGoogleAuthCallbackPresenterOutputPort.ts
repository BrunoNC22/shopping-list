export type HandleGoogleAuthCallbackSuccessType = {
  jwtToken: string,
  name: string,
  email: string,
  expiresIn: number,
  id: string
}

export interface HandleGoogleAuthCallbackPresenterOutputPort {
  defaultError(error: Error): void
  success(successProps: HandleGoogleAuthCallbackSuccessType): void
}