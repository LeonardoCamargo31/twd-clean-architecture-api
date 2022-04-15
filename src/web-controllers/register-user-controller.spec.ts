import { UserData } from '@/entities'
import { InvalidEmailError, InvalidNameError } from '@/entities/errors'
import { UseCase } from '@/usecases/ports'
import { RegisterUserOnMailingList } from '@/usecases/register-user-on-mailing-list'
import { UserRepository } from '@/usecases/register-user-on-mailing-list/ports'
import { InMemoryUserRepository } from '@/usecases/register-user-on-mailing-list/repository/in-memory-user-repository'
import { HttpRequest, HttpResponse } from '@/web-controllers/ports'
import { RegisterUserController } from './register-user-controller'

class ErrorThrowUseCaseStub implements UseCase {
  perform (request:any): Promise<any> {
    throw Error()
  }
}

describe('Register user web controller', () => {
  const users: UserData[] = []
  const repository: UserRepository = new InMemoryUserRepository(users)
  const useCase: UseCase = new RegisterUserOnMailingList(repository)
  const sut: RegisterUserController = new RegisterUserController(useCase)
  const errorThrowUseCaseStub: UseCase = new ErrorThrowUseCaseStub()

  test('should return status code 201 when request contains valid user data', async () => {
    const request:HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }

    const response : HttpResponse = await sut.handle(request)
    expect(response.statusCode).toEqual(201)
    expect(response.body).toEqual(request.body)
  })

  test('should return status code 400 when request contains invalid name', async () => {
    const requestWithInvalidName:HttpRequest = {
      body: {
        name: 'a',
        email: 'any@email.com'
      }
    }

    const response : HttpResponse = await sut.handle(requestWithInvalidName)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidNameError)
  })

  test('should return status code 400 when request contains invalid email', async () => {
    const requestWithInvalidEmail:HttpRequest = {
      body: {
        name: 'Any name',
        email: 'invalid_email.com'
      }
    }

    const response : HttpResponse = await sut.handle(requestWithInvalidEmail)
    expect(response.statusCode).toEqual(400)
    expect(response.body).toBeInstanceOf(InvalidEmailError)
  })

  test('should return status code 400 when request is missing user name', async () => {
    const requestWithMissingName:HttpRequest = {
      body: {
        email: 'any@email.com'
      }
    }

    const response : HttpResponse = await sut.handle(requestWithMissingName)
    expect(response.statusCode).toEqual(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: name.')
  })

  test('should return status code 400 when request is missing user email', async () => {
    const requestWithMissingEmail:HttpRequest = {
      body: {
        name: 'Any name'
      }
    }

    const response : HttpResponse = await sut.handle(requestWithMissingEmail)
    expect(response.statusCode).toEqual(400)
    expect((response.body as Error).message).toEqual('Missing parameter from request: email.')
  })

  test('should return status code 500 when server raises', async () => {
    const request:HttpRequest = {
      body: {
        name: 'Any name',
        email: 'any@email.com'
      }
    }

    const controller: RegisterUserController = new RegisterUserController(errorThrowUseCaseStub)
    const response : HttpResponse = await controller.handle(request)
    expect(response.statusCode).toEqual(500)
    expect(response.body).toBeInstanceOf(Error)
  })
})
