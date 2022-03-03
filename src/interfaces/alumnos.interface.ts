import { ObjectId } from 'mongodb';
import { Document } from 'mongoose'

export default interface IAlumnos extends Document {
  _id: string;
  dni: number;
  carrera: string;
  estado: boolean;
  persona_id: ObjectId,
  createdAt: Date;
  updatedAt: Date;
};