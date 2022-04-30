import { Router } from 'express'
import { adapterRoute } from '@/main/adapters'
import { makeRegisterUserController } from '@/main/factories'

export default (route:Router):void => {
  route.post('/register', adapterRoute(makeRegisterUserController()))
}
