import { UserData } from '@/entities'
import { Either } from '@/shared'
import { MailServiceError } from '@/usecases/errors'
import { UseCase } from '@/usecases/ports'
import { EmailOptions, EmailService } from '@/usecases/send-email/ports'

export class SendEmail implements UseCase {
  private readonly options: EmailOptions
  private readonly mailService: EmailService

  constructor (options:EmailOptions, mailService:EmailService) {
    this.options = options
    this.mailService = mailService
  }

  perform (userData:UserData):Promise<Either<MailServiceError, EmailOptions>> {
    const greetings = 'E aí <b>' + userData.name + '</b>, beleza?'
    const customizedHtml = greetings + '<br><br>' + this.options.emailBodyHtml
    const emailInfo: EmailOptions = {
      host: this.options.host,
      port: this.options.port,
      username: this.options.username,
      password: this.options.password,
      from: this.options.from,
      to: userData.name + '<' + userData.email + '>',
      subject: this.options.subject,
      emailBody: this.options.emailBody,
      emailBodyHtml: customizedHtml,
      attachments: this.options.attachments
    }

    return this.mailService.send(emailInfo)
  }
}
