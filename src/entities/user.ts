import { UserData } from './user-data'
import { Either, left } from '../shared'
import { InvalidEmailError } from './errors/invalid-email-error'
import { Email } from './email'

export class User {
  // return InvalidEmailError or User
  static create (userData: UserData): Either<InvalidEmailError, User> {
    const emailOrError = Email.create(userData.email)
    if (emailOrError.isLeft()) {
      return left(new InvalidEmailError())
    }
  }
}
