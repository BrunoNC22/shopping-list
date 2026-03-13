
export type SignJWTServiceProps = { 
  payload: object
}

export interface SignJWTServiceOutputPort {
  sign(props: SignJWTServiceProps): string
}

export type VerifyJWTServiceProps = {
  token: string
}

export interface VerifyJWTServiceOutputPort<T> {
  verify(props: VerifyJWTServiceProps): T
}

export interface JWTServiceOutputPort<T> extends SignJWTServiceOutputPort, VerifyJWTServiceOutputPort<T> {}