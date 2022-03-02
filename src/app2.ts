import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
// import 'dotenv/config';
import { configureDatabase } from '../database/connection'
import PersonasRoutes from '../src/routes/personas.routes'
import ProductosRoutes from '../src/routes/productos.routes'

class Server {
  private readonly app: Application
  private readonly port: string
  private readonly apiPaths = {
    personas: '/api/personas',
    productos: '/api/productos'
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
    this.app.use(cors())
    // Helmet
    this.app.use(helmet())
    // Lectura del Body
    this.app.use(express.json())
  }

  routes () {
    this.app.use(this.apiPaths.personas, PersonasRoutes)
    this.app.use(this.apiPaths.productos, ProductosRoutes)
  }

  listen () {
    this.app.listen(this.port, () => {
      console.log('Server running on port: ' + this.port)
    })
  }
}

export default Server
