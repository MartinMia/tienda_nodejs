import { ObjectId } from 'mongodb';
import { Document } from 'mongoose'

export default interface IProdVta extends Document {
  _id: string;
  venta_id: ObjectId;
  producto_id: ObjectId;
  cantida_productos:number;
  createdAt: Date;
  updatedAt: Date;
};