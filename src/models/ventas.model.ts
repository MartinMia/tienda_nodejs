import { model, Schema } from 'mongoose';
import IVenta from '../interfaces/ventas.interface';


const VentaSchema = new Schema({
    forma_de_pago: {
        type: String,
        required: [true, 'El tipo de pago es obligatorio'],
        enum: ['contado', 'tarjeta']
    },
    precio_total: {
        type: Number,
        required: [true, 'El precio es obligatorio']
    },
    estado: {
        type: String,
        required: [true, 'El estado es obligatorio. Valores posibles: aprobada/anulada.'],
        enum: ['aprobada', 'anulada']
    },
    persona_id: {
        type: Schema.Types.ObjectId,
        ref: 'Persona',
      },
      productos: [{
        type: Schema.Types.ObjectId,
        ref: 'Productos',
      }]
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

export default model<IVenta>('Venta', VentaSchema);