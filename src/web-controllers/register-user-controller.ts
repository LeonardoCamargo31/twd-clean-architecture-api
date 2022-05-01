import { HttpRequest, HttpResponse } from './ports'
import { UserData } from '@/entities'
import { badRequest, created, serverError } from './util'
import { MissingParamError } from '@/usecases/register-user-on-mailing-list/errors/missing-param-error'
import { UseCase } from '@/usecases/ports'

export class RegisterUserController {
  private readonly useCase:UseCase

  constructor (useCase:UseCase) {
    this.useCase = useCase
  }

  async handle (request: HttpRequest):Promise<HttpResponse> {
    try {
      if (!request.body.name) {
        return badRequest(new MissingParamError('name'))
      }

      if (!request.body.email) {
        return badRequest(new MissingParamError('email'))
      }

      const userData:UserData = request.body
      const response = await this.useCase.perform(userData)

      if (response.isLeft()) {
        return badRequest(response.value)
      }

      if (response.isRight()) {
        return created(response.value)
      }
    } catch (error) {
      console.error(error)
      return serverError(error)
    }
  }
}
