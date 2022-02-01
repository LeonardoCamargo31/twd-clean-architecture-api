import { UserRepository } from './ports/user-repository'
import { UserData } from '../../entities/user-data'
import { Either, left, right } from '../../shared'
import { User } from '../../entities/user'
import { InvalidEmailError } from '../../entities/errors/invalid-email-error'
import { InvalidNameError } from '../../entities/errors/invalid-name-error'

export class RegisterUserOnMailingList {
  private readonly userRepository:UserRepository

  constructor (userRepository:UserRepository) {
    this.userRepository = userRepository
  }

  async registerUserOnMailingList (request: UserData):Promise<Either<InvalidNameError | InvalidEmailError, UserData>> {
    const userOrError: Either<InvalidNameError | InvalidEmailError, User> = User.create(request)
    if (userOrError.isLeft()) {
      return left(userOrError.value)
    }

    if (!(await this.userRepository.exists(request))) {
      await this.userRepository.add(request)
    }

    return right(request)
  }
}
