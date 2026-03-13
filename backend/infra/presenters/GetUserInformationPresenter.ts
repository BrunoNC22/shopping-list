import { User } from "../../domain/models/User";
import { GetUserInformationPresenterOutputPort } from "../../domain/usecases/GetUserInformation";
import { Response } from "express";

export class GetUserInformationPresenter implements GetUserInformationPresenterOutputPort {
  constructor(private readonly response: Response) {}

  defaultError(error: Error): void {
    console.log(error)
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