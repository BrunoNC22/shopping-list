import { prisma } from "../../../infra/db/prisma/prisma"
import { UserPersisterPrismaAdapter } from "../../../infra/db/UserPersisterPrismaAdapter"

export const createUserPersisterPrismaAdapter = () => {
  return new UserPersisterPrismaAdapter(prisma)
}