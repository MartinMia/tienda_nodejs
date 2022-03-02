import { model, Schema } from 'mongoose';
import IAlumnos from '../interfaces/alumnos.interface';

const AlumnosSchema = new Schema({
  dni: {
    type: Number,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  carrera: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  estado: {
    type: Boolean,
    default: true
  },
  persona_id: {
    type: Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: true }
})

export default model<IAlumnos>('Alumno', AlumnosSchema);