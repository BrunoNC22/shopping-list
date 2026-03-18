
import { GetUserInformationPresenterOutputPort, User } from "@shopping-list/domain";
import { Response } from "express";

export class GetUserInformationPresenter implements GetUserInformationPresenterOutputPort {
  constructor(private readonly response: Response) {}

  defaultError(error: Error): void {
    console.log(`An unexpected error ocurred while getting user information: ${error.message}\n${error.stack}`)
    this.response.status(500).send({ message: "Internal server error." })
  }

  defaultSuccess(user: User): void {
    this.response.send({
      id: user.id,
      name: user.name,
      email: user.email,
      profilePicUrl: user.profilePictureUrl
    })
  }

  userNotFoundError(userId: string): void {
    console.log(`User with id ${userId} not found.`)
    this.response.status(401).send({ message: "Unauthorized" })
  }
}