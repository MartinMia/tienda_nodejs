import { ObjectId } from 'mongodb';
import { Document } from 'mongoose'

export default interface IVenta extends Document {
  _id: string;
  forma_de_pago: string;
  precio_total: number;
  estado: string;
  persona_id: ObjectId;
  producto_id:ObjectId;
  productos: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};