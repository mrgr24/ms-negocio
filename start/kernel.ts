import Server from '@ioc:Adonis/Core/Server'
import MsSecMid from 'App/Middleware/MsSecMid'

Server.middleware.register([
  () => import('@ioc:Adonis/Core/BodyParser'),
])


Server.middleware.registerNamed({
  Security: () => import('App/Middleware/MsSecMid'),
})
