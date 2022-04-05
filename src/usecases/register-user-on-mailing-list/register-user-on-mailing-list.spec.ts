import { UserData } from '@/entities/user-data'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { RegisterUserOnMailingList } from './register-user-on-mailing-list'
import { InMemoryUserRepository } from './repository/in-memory-user-repository'

describe('Register user on mailing list use case', () => {
  test('should add user with complete data to mailing list', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repository)
    const name = 'any_name'
    const email = 'any@email.com'
    await useCase.registerUserOnMailingList({ name, email })
    const user = await repository.findUserByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })

  test('should not add user with invalid email', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repository)
    const name = 'any_name'
    const invalidEmail = 'invalid_email'
    const response = (await useCase.registerUserOnMailingList({ name, email: invalidEmail })).value as Error
    const user = await repository.findUserByEmail('any@email.com')
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidEmailError')
    expect(response.message).toEqual('Invalid email: ' + invalidEmail + '.')
  })

  test('should not add user with invalid name', async () => {
    const users: UserData[] = []
    const repository: UserRepository = new InMemoryUserRepository(users)
    const useCase: RegisterUserOnMailingList = new RegisterUserOnMailingList(repository)
    const invalidName = ''
    const email = 'any@email.com'
    const response = (await useCase.registerUserOnMailingList({ name: invalidName, email })).value as Error
    const user = await repository.findUserByEmail('any@email.com')
    expect(user).toBeNull()
    expect(response.name).toEqual('InvalidNameError')
    expect(response.message).toEqual('Invalid name: ' + invalidName + '.')
  })
})
