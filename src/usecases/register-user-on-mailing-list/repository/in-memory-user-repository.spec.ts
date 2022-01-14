import { UserData } from '../user-data'
import { InMemoryUserRepository } from './in-memory-user-repository'

describe('In memory user repository', () => {
  test('should return null if user is not found', async () => {
    const users: UserData[] = []
    const repository = new InMemoryUserRepository(users)
    const user = await repository.findUserByEmail('any@mail.com')
    expect(user).toBeNull()
  })

  test('should return user if it is found in the repository', async () => {
    const users: UserData[] = []
    const name = 'any_name'
    const email = 'any@email.com'
    const repository = new InMemoryUserRepository(users)
    await repository.add({ name, email })
    const user = await repository.findUserByEmail('any@email.com')
    expect(user.name).toBe('any_name')
  })

  test('should return all users in the repository', async () => {
    const users: UserData[] = [
      {
        name: 'any_name',
        email: 'any@email.com'
      },
      {
        name: 'second_name',
        email: 'second@email.com'
      }]
    const name = 'any_name'
    const email = 'any@email.com'
    const repository = new InMemoryUserRepository(users)
    await repository.add({ name, email })
    const returnedUsers = await repository.findAllUsers()
    expect(returnedUsers.length).toBe(2)
  })
})
