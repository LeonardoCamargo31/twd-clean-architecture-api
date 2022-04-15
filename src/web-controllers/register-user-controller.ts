import { HttpRequest, HttpResponse } from './ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserData } from '@/entities'
import { badRequest, created } from './util'
import { MissingParamError } from '@/usecases/register-user-on-mailing-list/errors/missing-param-error'

export class RegisterUserController {
  private readonly useCase:RegisterUserOnMailingList

  constructor (useCase:RegisterUserOnMailingList) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest):Promise<HttpResponse> {
    if (!request.body.name) {
      return badRequest(new MissingParamError('name'))
    }

    if (!request.body.email) {
      return badRequest(new MissingParamError('email'))
    }

    const userData:UserData = request.body
    const response = await this.useCase.registerUserOnMailingList(userData)

    if (response.isLeft()) {
      return badRequest(response.value)
    }

    if (response.isRight()) {
      return created(response.value)
    }
  }
}
