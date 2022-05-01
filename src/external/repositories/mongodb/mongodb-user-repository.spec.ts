import { UserData } from '@/entities'
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
    const userData:UserData = {
      name: 'Any name',
      email: 'any@mail.com'
    }
    await userRepository.add(userData)
    const user = await userRepository.exists(userData)
    expect(user).toBeTruthy()
  })
})
