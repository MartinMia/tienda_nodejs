import { model, Schema } from 'mongoose';
import IAlumnos from '../interfaces/alumnos.interface';

const AlumnosSchema = new Schema({
  dni: {
    type: Number,
    required: [true, 'El dni es obligatorio'],
    unique: true
  },
  carrera: {
    type: String,
    required: [true, 'La carrera es obligatoria']
  },
  estado: {
    type: Boolean,
    default: true
  },
  persona_id: {
    type: Schema.Types.ObjectId,
    ref: 'Persona',
    required: true
  },
  materias: [{
    type: Schema.Types.ObjectId,
    ref: 'Materia',
  }]
}, {
  timestamps: { createdAt: true, updatedAt: true }
})

export default model<IAlumnos>('Alumno', AlumnosSchema);