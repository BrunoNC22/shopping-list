import { AuthenticateUserPresenter, User } from "@shopping-list/domain";
import { NextFunction, Request, Response } from "express";

export class ExpressAuthenticateUserPresenter implements AuthenticateUserPresenter {
  constructor(
    private readonly req: Request,
    private readonly res: Response,
    private readonly next: NextFunction
  ) {}

  defaultError(message: string): void {
    this.res.status(500).send({ message })
  }

  forbidden(message: string): void {
    this.res.status(403).send({ message })
  }

  success(user: User): void {
    this.req.user = user
    this.next()
  }

  unauthorized(message: string): void {
    this.res.status(401).send({ message })
  }
}