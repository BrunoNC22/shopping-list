
import { User, UserNotFoundError, UserPersisterOutputPort } from "@shopping-list/domain";
import { PrismaClient } from "./prisma/generated/client";


export class UserPersisterPrismaAdapter implements UserPersisterOutputPort {
  constructor(private readonly prismaClient: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.prismaClient.user.delete({
      where: {
        id: id
      }
    })
  }

  async save(user: User): Promise<void> {
    await this.prismaClient.user.create({
      data: {
        id: user.id,
        email: user.email,
        name: user.name,
        profilePictureUrl: user.profilePictureUrl ?? ""
      }
    })
  }

  async getAll(): Promise<User[]> {
    const dbUsers =  await this.prismaClient.user.findMany()

    return dbUsers.map(
      (dbUser) => new User(
        dbUser.id, 
        dbUser.name, 
        dbUser.email, 
        dbUser.profilePictureUrl
      )
    )
  }

  async getByEmail(email: string): Promise<User> {
    let attempts = 0
    const maxAttempts = 3

    while (attempts < maxAttempts) {
      try {
        const dbUser = await this.prismaClient.user.findUnique({
          where: { email }
        })

        if (!dbUser) {
          throw new UserNotFoundError(`User with email ${email} not found.`)
        }

        return new User(
          dbUser.id,
          dbUser.name,
          dbUser.email,
          dbUser.profilePictureUrl
        )
      } catch (error: any) {
        const isStartupError =
          typeof error?.message === 'string' &&
          error.message.includes('database system is starting up')

        console.log(`Error: ${error.message} attempt: ${attempts}`)
        if (isStartupError) {
          attempts++

          await new Promise((resolve) => setTimeout(resolve, 1000 * (attempts + 1)))

          continue
        }

        throw error
      }
    }

    throw new Error("Unexpected error while trying to get user by email.")
  }

  async getById(id: string): Promise<User> {
    const dbUser = await this.prismaClient.user.findUnique({
      where: {
        id
      }
    })

    if (!dbUser) throw new UserNotFoundError(`User with id ${id} not found.`)

    return new User(dbUser.id, dbUser.name, dbUser.email, dbUser.profilePictureUrl)
  }
}