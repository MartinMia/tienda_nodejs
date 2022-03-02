import dotenv from 'dotenv'
import Server from '../src/app2'

dotenv.config()

const server = new Server()

server.listen()
