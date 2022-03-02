import { Document } from 'mongoose'

export default interface IPersonas extends Document {
  _id: string;
  nombreCompleto: string;
  email: string;
  contraseña: string;
  telefono: string;
  rol: string;
  estado: boolean;
  createdAt: Date;
  updatedAt: Date;
};