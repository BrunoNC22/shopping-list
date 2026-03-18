import { JWTServiceOutputPort, SignJWTServiceProps, VerifyJWTServiceProps } from "@shopping-list/domain"
import jwt from "jsonwebtoken"

export class JsonwebtokenJWTServiceAdapter<T> implements JWTServiceOutputPort<T> {
  constructor(private readonly jwtSecret: string) {}

  sign({ payload }: SignJWTServiceProps): string {
    return jwt.sign(payload, this.jwtSecret)
  }

  verify({ token }: VerifyJWTServiceProps): T {
    return jwt.verify(token, this.jwtSecret) as T
  }
}