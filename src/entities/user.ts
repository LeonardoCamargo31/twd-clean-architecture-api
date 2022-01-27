import { UserData } from './user-data'
import { Either, left, right } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Email } from './email'
import { InvalidNameError } from './errors/invalid-name-error'
import { Name } from './name'

export class User {
  public readonly name:Name
  public readonly email:Email

  private constructor (name:Name, email:Email) {
    this.name = name
    this.email = email
  }

  // return InvalidEmailError or User
  static create (userData: UserData): Either<InvalidNameError | InvalidEmailError, User> {
    const nameOrError = Name.create(userData.name)
    if (nameOrError.isLeft()) {
      return left(new InvalidNameError())
    }
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }

    const name = nameOrError.value
    const email = emailOrError.value
    return right(new User(name, email))
  }
}
