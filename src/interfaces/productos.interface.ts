import { Document } from 'mongoose'

export default interface IProduct extends Document {
  _id: string;
  nombre: string;
  precio: string;
  stock: string;
  estado:any;
  createdAt: Date;
  updatedAt: Date;
};