import { UserRepository } from '../ports/user-repository'
import { UserData } from '../../../entities/user-data'

export class InMemoryUserRepository implements UserRepository {
  private users: UserData[]

  constructor (users:UserData[]) {
    this.users = users
  }

  async add (user: UserData): Promise<void> {
    const exists = await this.exists(user)
    if (!exists) {
      this.users.push(user)
    }
  }

  async findUserByEmail (email: string): Promise<UserData> {
    const user = this.users.find(user => {
      return user.email === email
    })
    return user || null
  }

  async findAllUsers (): Promise<UserData[]> {
    return this.users
  }

  async exists (user: UserData): Promise<boolean> {
    const userExists = await this.findUserByEmail(user.email)
    return !!userExists
  }
}
