import { HandleGoogleAuthCallbackPresenterOutputPort, HandleGoogleAuthCallbackSuccessType } from "@shopping-list/domain";
import { Response } from "express";
import { env } from "../../main/config/env";

export class GoogleLoginPresenter implements HandleGoogleAuthCallbackPresenterOutputPort {
  constructor(private readonly response: Response) {}

  defaultError(error: Error): void {
    console.log(`An unexpected error ocurred while loging in: ${error.message}\n${error.stack}`)
    this.response.json({message: `An unexpected error ocurred while loging in: ${error.message}`}).status(500).send()
  }

  success(successProps: HandleGoogleAuthCallbackSuccessType): void {
    const isProduction = env.NODE_ENV === "production"
    this.response
    .cookie("auth_token", successProps.jwtToken, { 
      httpOnly: true,
      secure: isProduction,
      sameSite: isProduction ? "none" : "lax"
    })
    .redirect(`${env.FRONTEND_URL}/login`)
  }
}