import { Router } from 'express'
import { adapterRoute } from '@/main/adapters'
import { makeRegisterUserController } from '@/main/factories'

export const handle = (route:Router):void => {
  route.post('/register', adapterRoute(makeRegisterUserController()))
}
