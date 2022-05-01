import { MongoHelper } from '@/external/repositories/mongodb/helper'
import { MongodbUserRepository } from './mongodb-user-repository'

describe('Mongodb user repository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    await MongoHelper.clearCollection('users')
  })

  test('when user is added, it should exist', async () => {
    const userRepository = new MongodbUserRepository()
    const userData = {
      name: 'Any name',
      email: 'any@mail.com'
    }
    await userRepository.add(userData)
    const user = await userRepository.exists(userData)
    expect(user).toBeTruthy()
  })

  test('find all users should return all added users', async () => {
    const userRepository = new MongodbUserRepository()
    await userRepository.add({
      name: 'First name',
      email: 'first@mail.com'
    })
    await userRepository.add({
      name: 'Second name',
      email: 'second@mail.com'
    })
    const users = await userRepository.findAllUsers()
    expect(users[0].name).toBe('First name')
    expect(users[1].name).toBe('Second name')
  })
})
