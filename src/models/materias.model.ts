import { model, Schema } from 'mongoose';
import IMateria from '../interfaces/materias.interface';

const MateriasSchema = new Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es obligatorio'],
    unique: true
  },
  duracion: {
    type: String,
    required: [true, 'La duracion es obligatoria'],
    enum: ['anual', 'semestral']
  },
  estado: {
    type: Boolean,
    default: true
  },
  alumnos: [{
    type: Schema.Types.ObjectId,
    ref: 'Alumno'
  }]
}, {
  timestamps: { createdAt: true, updatedAt: true }
})

export default model<IMateria>('Materia', MateriasSchema);