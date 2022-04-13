import { HttpRequest, HttpResponse } from './ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserData } from '@/entities'
import { created } from './util'

export class RegisterUserController {
  private readonly useCase:RegisterUserOnMailingList

  constructor (useCase:RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest):Promise<HttpResponse> {
    const userData:UserData = request.body
    const response = await this.useCase.registerUserOnMailingList(userData)

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
