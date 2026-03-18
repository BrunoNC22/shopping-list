export class User {
  private _name: string
  private _email: string
  private _profilePictureUrl?: string

  constructor(readonly id: string, name: string, email: string, profilePictureUrl?: string) {
    this._name = name
    this._email = email
    this._profilePictureUrl = profilePictureUrl
  }

  get name(): string {
    return this._name
  }

  set name(newName: string) {
    this._name = newName
  }

  get email(): string {
    return this._email
  }

  set email(newEmail: string) {
    this._email = newEmail
  }

  get profilePictureUrl(): string | undefined {
    return this._profilePictureUrl
  }

  set profilePictureUrl(newprofilePictureUrl: string | undefined) {
    this._profilePictureUrl = newprofilePictureUrl
  }
}