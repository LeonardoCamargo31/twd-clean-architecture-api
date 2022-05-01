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
    const mongodbUserRepository = new MongodbUserRepository()
    const userData = {
      name: 'Any name',
      email: 'any@mail.com'
    }
    await mongodbUserRepository.add(userData)
    const user = await mongodbUserRepository.exists(userData)
    expect(user).toBeTruthy()
  })

  test('find all users should return all added users', async () => {
    const mongodbUserRepository = new MongodbUserRepository()
    await mongodbUserRepository.add({
      name: 'First name',
      email: 'first@mail.com'
    })
    await mongodbUserRepository.add({
      name: 'Second name',
      email: 'second@mail.com'
    })
    const users = await mongodbUserRepository.findAllUsers()
    expect(users[0].name).toBe('First name')
    expect(users[1].name).toBe('Second name')
  })
})
