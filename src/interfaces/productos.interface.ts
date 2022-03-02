import { Document } from 'mongoose'

export default interface IProduct extends Document {
  _id: string;
  nombre: string;
  precio: number;
  stock: number;
  estado: string;
  createdAt: Date;
  updatedAt: Date;
};