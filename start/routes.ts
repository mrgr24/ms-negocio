/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'

Route.get('/', async () => {
  return { hello: 'world' }
})

import './routes/Maquinas'
import './routes/Mensajes'
import './routes/Departamentos'
import './routes/Gobernantes'
import './routes/Chats'
import './routes/Mensajes'
import './routes/Usuarios'
import './routes/Servicios'
import './routes/Turnos'
import './routes/TipoServicios'
import './routes/Chats'
import './routes/Combos'
import './routes/Cuotas'
import './routes/EspecialidadMaquinarias'
import './routes/Especialidades'
import './routes/Evidencias'
import './routes/Facturas'
import './routes/GPS'
import './routes/Mantenimientos'
import './routes/Municipios'
import './routes/Obras'
import './routes/ObrasMunicipios'
import './routes/Polizas'
import './routes/ProcedimientoMantenimientos'
import './routes/Procedimientos'
import './routes/Operarios'
import './routes/OperarioEspecialidades'
import './routes/MaquinaCombos'

