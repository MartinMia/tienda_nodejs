import { Request, Response } from "express";
import Producto from "../models/productos.model";
import IProducto from "../interfaces/productos.interface";

// Get all resources
export const index = async (req: Request, res: Response) => {
    // agregar filtros

    try {
        const { ...data } = req.query; 
        let filters = { ...data };
        
        if (data.nombre) {
            filters = { ...filters, nombre: {$regex: data.nombre, $options: 'i'} }
        }

        let productos = await Producto.find(filters);

        res.json(productos);
    } catch (error) {
        res.status(500).send('Algo salió mal');
    }
};

// Get one resource
export const show = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let producto = await Producto.findById(id);

        if (!producto)
            res.status(404).send(`No se encontró el producto con id: ${id}`);
        else
            res.json(producto);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Create a new resource
export const store = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;

        const producto: IProducto = new Producto({
            nombre: data.nombre,
            precio: data.precio,
            stock: data.stock,
            estado: data.estado,
        });

        await producto.save();

        res.status(200).json(producto);
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
        let producto = await Producto.findById(id);

        if (!producto)
            return res.status(404).send(`No se encontró el película con id: ${id}`);
        
        if (data.nombre) producto.nombre = data.nombre;
        if (data.precio) producto.precio = data.precio;
        if (data.stock) producto.stock = data.stock;
        if (data.estado) producto.estado = data.estado;

        await producto.save();
        
        res.status(200).json(producto);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Delete a resource
export const destroy = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let producto = await Producto.findByIdAndDelete(id);
        console.log(producto);
        if (!producto)
            res.status(404).send(`No se encontró el película con id: ${id}`);
        else
            res.status(200).json(producto);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};