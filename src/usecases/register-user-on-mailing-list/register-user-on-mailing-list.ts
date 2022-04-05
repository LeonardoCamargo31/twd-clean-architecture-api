import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { UserData, User } from '@/entities'
import { Either, left, right } from '@/shared'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'

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
