import { RegisterUserController } from '@/web-controllers/'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/'
import { MongodbUserRepository } from '@/external/repositories/mongodb/mongodb-user-repository'

export const makeRegisterUserController = ():RegisterUserController => {
  const mongodbUserRepository = new MongodbUserRepository()
  const registerUserOnMailingList = new RegisterUserOnMailingList(mongodbUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingList)
  return registerUserController
}
