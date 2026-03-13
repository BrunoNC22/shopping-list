export type GoogleLoginSuccessType = {
  jwtToken: string,
  name: string,
  email: string,
  expiresIn: number,
  id: string
}

export interface GoogleLoginPresenterOutputPort {
  defaultError(error: Error): void
  success(successProps: GoogleLoginSuccessType): void
}