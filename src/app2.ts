import express, { Application } from 'express';
import helmet from 'helmet';
// import 'dotenv/config';
import { configureDatabase } from '../database/connection'
import AlumnosRoutes from '../src/routes/alumnos.routes'
import PersonasRoutes from '../src/routes/personas.routes'
import ProductosRoutes from '../src/routes/productos.routes'
import VentasRoutes from '../src/routes/ventas.routes'

class Server {
  private readonly app: Application
  private readonly port: string
  private readonly apiPaths = {
    alumnos: '/api/alumnos',
    personas: '/api/personas',
    productos: '/api/productos',
    ventas: '/api/ventas'
  }

  constructor () {
    this.app = express()
    this.port = process.env.PORT || '3000'

    // métodos iniciales
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.dbConnection()
    this.middlewares()
    this.routes()
  }

  async dbConnection () {
    await configureDatabase()
  }

  middlewares () {
    // CORS
    //this.app.use(cors())
    // Helmet
    this.app.use(helmet())
    // Lectura del Body
    this.app.use(express.json())
  }

  routes () {
    this.app.use(this.apiPaths.alumnos, AlumnosRoutes)
    this.app.use(this.apiPaths.personas, PersonasRoutes)
    this.app.use(this.apiPaths.productos, ProductosRoutes)
    this.app.use(this.apiPaths.ventas, VentasRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ' + this.port)
    })
  }
}

export default Server
