import { ObjectId } from 'mongodb';
import { Document } from 'mongoose'

export default interface IMateria extends Document {
  _id: string;
  nombre: number;
  duracion: string;
  estado: boolean;
  alumnos: Array<string>;
  createdAt: Date;
  updatedAt: Date;
};