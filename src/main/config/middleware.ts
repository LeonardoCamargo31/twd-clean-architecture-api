import { Express } from 'express'
import { bodyParser } from '@/main/config/middleware/body-parser'

export const setupMiddleware = (app:Express):void => {
  app.use(bodyParser)
}
