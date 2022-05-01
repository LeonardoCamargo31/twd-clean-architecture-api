import 'module-alias/register'
import { app } from '@/main/config/app'
import { MongoHelper } from '@/external/repositories/mongodb/helper'

MongoHelper.connect(process.env.MONGO_URL)
  .then(async () => {
    app.listen(3000, () => {
      console.log('Server running at http://localhost:3000')
    })
  })
  .catch(err => {
    console.error(err)
  })
