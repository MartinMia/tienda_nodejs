import { model, Schema } from 'mongoose';
import IProdVta from '../interfaces/prodvtas.interface';

const ProdVtaSchema = new Schema({
    venta_id: {
        type: Schema.Types.ObjectId,
        ref: 'Venta',
        required: [true, 'El id_venta es obligatorio']
    },
    producto_id: {
        type: Schema.Types.ObjectId,
        ref: 'Producto',
        required: [true, 'El ide_prod es obligatorio']
    },
    cantidad_productos: {
        type: Number,
        required: [true, 'La cantidad es obligatoria']
    }
}, {
    timestamps: { createdAt: true, updatedAt: true }
})

export default model<IProdVta>('Product', ProdVtaSchema);