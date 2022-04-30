import { RegisterUserController } from '@/web-controllers/'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list/'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'

export const makeRegisterUserController = ():RegisterUserController => {
  const inMemoryUserRepository = new InMemoryUserRepository([])
  const registerUserOnMailingList = new RegisterUserOnMailingList(inMemoryUserRepository)
  const registerUserController = new RegisterUserController(registerUserOnMailingList)
  return registerUserController
}