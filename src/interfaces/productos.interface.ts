import { Document } from 'mongoose'

export default interface IProduct extends Document {
  _id: string;
  nombre: string;
  precio: string;
  stock: string;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
};