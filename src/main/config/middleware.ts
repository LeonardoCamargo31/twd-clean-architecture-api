import { Express } from 'express'
import { bodyParser, cors, contentType } from '@/main/config/middleware/'

export const setupMiddleware = (app:Express):void => {
  app.use(bodyParser)
  app.use(cors)
  app.use(contentType)
}
