export type GoogleAuthServiceProps = {
  code: string
}

export type GoogleAuthServiceResponse = {
  id: string,
  email: string,
  isEmailVerified: boolean,
  name: string,
  pictureUrl: string
}

export interface GoogleAuthServiceOutputPort {
  getUserData(props: GoogleAuthServiceProps): Promise<GoogleAuthServiceResponse>
}