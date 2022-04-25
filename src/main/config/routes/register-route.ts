import { Router } from 'express'
import { adapterRoute } from '@/main/config/adapters'
import { makeRegisterUserController } from '@/main/config/factories/'

export default (route:Router):void => {
  route.post('/register', adapterRoute(makeRegisterUserController()))
}
