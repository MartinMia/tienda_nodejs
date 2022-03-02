import { model, Schema } from 'mongoose';
import IPersonas from '../interfaces/personas.interface';

const PersonaSchema = new Schema({
  nombreCompleto: {
    type: String,
    required: [true, 'El nombreCompleto es obligatorio']
  },
  email: {
    type: String,
    required: [true, 'El email es obligatorio'],
    unique: true
  },
  contraseña: {
    type: String,
    required: [true, 'La contraseña es obligatoria']
  },
  telefono: {
    type: String
  },
  rol: {
    type: String,
    required: [true, 'El rol es obligatorio. Valores posibles: admin/cliente.'],
    enum: ['admin', 'cliente']
  },
  estado: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: { createdAt: true, updatedAt: true }
})

export default model<IPersonas>('Persona', PersonaSchema);