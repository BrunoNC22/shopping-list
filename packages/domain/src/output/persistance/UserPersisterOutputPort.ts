import { User } from "../../models/User"

export interface SaveUserPersisterOutputPort {
  save(user: User): Promise<void>
}

export interface DeleteUserByIdPersisterOutputPort {
  delete(id: string): Promise<void>
}

export interface GetAllUserPersisterOutputPort {
  getAll(): Promise<User[]>
}

export interface GetByEmailUserPersisterOutputPort {
  getByEmail(email: string): Promise<User>
}

export interface GetByIdUserPersisterOutputPort {
  getById(id: string): Promise<User>
}

export interface UserPersisterOutputPort
  extends
    SaveUserPersisterOutputPort,
    DeleteUserByIdPersisterOutputPort,
    GetAllUserPersisterOutputPort,
    GetByEmailUserPersisterOutputPort,
    GetByIdUserPersisterOutputPort {}
