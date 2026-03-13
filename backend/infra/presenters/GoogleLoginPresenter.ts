import { Response } from "express";
import { GoogleLoginPresenterOutputPort, GoogleLoginSuccessType } from "../../domain/output/GoogleLoginPresenterOutputPort";

export class GoogleLoginPresenter implements GoogleLoginPresenterOutputPort {
  constructor(private readonly response: Response) {}

  defaultError(error: Error): void {
    console.log(`An unexpected error ocurred while loging in: ${error.message}\n${error.stack}`)
    this.response.json({message: `An unexpected error ocurred while loging in: ${error.message}`}).status(500).send()
  }

  success(successProps: GoogleLoginSuccessType): void {
    this.response
    .cookie("auth_token", successProps.jwtToken, { httpOnly: true })
    .redirect(`http://localhost:5173/login`)
  }
}