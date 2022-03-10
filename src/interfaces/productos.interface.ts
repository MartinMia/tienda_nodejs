import { ObjectId } from 'mongodb';
import { Document } from 'mongoose'

export default interface IProduct extends Document {
  _id: string;
  nombre: string;
  precio: number;
  stock: number;
  estado: string;
  venta_id:ObjectId;
  ventas:Array<string>;
  createdAt: Date;
  updatedAt: Date;
};