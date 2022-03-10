import { Request, Response } from "express";
import IVenta from "../interfaces/ventas.interface";
import Producto from "../models/productos.model";
import Venta from "../models/ventas.model";

// Get all resources
export const index = async (req: Request, res: Response) => {
    // agregar filtros

    try {
        const { ...data } = req.body; 
        
        
        const venta: IVenta = new Venta({
            forma_de_pago: data.forma_de_pago,
            estado: data.estado,
        });

        await venta.save();

        res.status(200).json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal.');
    }
};

// Get one resource
export const show = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let venta = await Venta.findById(id);

        if (!venta)
            res.status(404).send(`No se encontró la materia con id: ${id}`);
        else
            res.json(venta);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Create a new resource
export const store = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;

        const venta: IVenta = new Venta({
            forma_de_pago:data.forma_de_pago,
            estado: data.estado,
            
        });

        await venta.save();

        res.status(200).json(venta);
    } catch (error) {
        console.log(error);
        res.status(500).send('Algo salió mal.');
    }
};

// Edit a resource
export const update = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    const { ...data } = req.body;
    try {
        let venta = await Venta.findById(id);

        if (!venta)
            return res.status(404).send(`No se encontró la venta con id: ${id}`);
        
        if (data.forma_de_pago) venta.forma_de_pago = data.forma_de_pago;    
        if (data.estado) venta.estado = data.estado;

        await venta.save();
        
        res.status(200).json(venta);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Delete a resource
export const destroy = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let venta = await Venta.findByIdAndDelete(id);

        if (!venta)
            res.status(404).send(`No se encontró venta con id: ${id}`);
        else
          // falta implementar
          res.status(200).json(venta);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

export const ingresarVenta = async (req: Request, res: Response) => {
    const ventaId = req?.params?.ventaId;
    const productoId = req?.params?.productoId;
    try {
        let venta = await Venta.findById(ventaId);
        let producto = await Producto.findById(productoId);

        if (!venta || !producto)
            res.status(404).send(`No se encontró la venta o el producto indicado.`);
        else {
            // buscar info acerca de transacciones

            await producto?.ventas.push(venta?.id);
            await venta?.productos.push(producto?.id);
            await producto?.save();
            await venta?.save();
            res.status(201).json(venta);
        }
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

export const borrarVenta = async (req: Request, res: Response) => {
    const ventaId = req?.params?.ventaId;
    const productoId = req?.params?.productoId;

    try {
        let venta = await Venta.findById(ventaId);
        let producto = await Producto.findById(productoId);

        if (!venta || !producto)
            res.status(404).send(`No se encontró la venta o el producto indicado.`);
        else {
            // buscar info acerca de transacciones
            let indiceProducto = Number(venta?.productos.indexOf(productoId));
            let indiceVenta = Number(producto?.ventas.indexOf(ventaId));

            if (indiceProducto !== -1) {
                venta?.productos.splice(indiceProducto,1);
                await venta?.save();
            }

            if (indiceVenta !== -1) {
                producto?.ventas.splice(indiceVenta,1);
                await producto?.save();
            }

            res.status(201).json(venta);
        }
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

//en vez de producto, persona?