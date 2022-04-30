import { Express, Router } from 'express'
import { readdirSync } from 'fs'
import path from 'path'

export const setupRoutes = (app:Express):void => {
  const router = Router()
  app.use('/api', router)
  const pathRoutes = path.join(__dirname, '..', 'routes')
  readdirSync(pathRoutes)
    .filter(item => !/(test\.ts|index.ts)/g.test(item))
    .map(async file => {
      return (await import(`${pathRoutes}/${file}`)).default(router)
    })
}
