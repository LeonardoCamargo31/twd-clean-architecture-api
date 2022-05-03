import { Either, Right, right } from '@/shared'
import { MailServiceError } from '@/usecases/errors'
import { EmailOptions, EmailService } from './ports/email-service'
import { SendEmail } from './send-email'

const fromName = 'test'
const fromEmail = 'from_email@mail.com'
const toName = 'any_name'
const toEmail = 'any_email@mail.com'
const subject = 'test e-mail'
const emailBody = 'Hello world attachment test'
const emailBodyHtml = '<b>Hello world attachment test</b>'
const attachmentFilePath = '../resources/text.txt'
const attachment = [{
  filename: attachmentFilePath,
  contentType: 'test/plain'
}]

const mailOptions:EmailOptions = {
  host: 'test',
  port: 867,
  username: 'test',
  password: '123456',
  from: fromName + ' ' + fromEmail,
  to: toName + '<' + toEmail + '>',
  subject: subject,
  emailBody: emailBody,
  emailBodyHtml: emailBodyHtml,
  attachments: attachment
}

class MailServiceStub implements EmailService {
  async send (options:EmailOptions):Promise<Either<MailServiceError, EmailOptions>> {
    return right(options)
  }
}

describe('Send email to user', () => {
  test('should email user with valid name and email address', async () => {
    const mailServiceStub = new MailServiceStub()
    const useCase = new SendEmail(mailOptions, mailServiceStub)
    const response = await useCase.perform({
      name: toName,
      email: toEmail
    })
    expect(response).toBeInstanceOf(Right)
  })
})
