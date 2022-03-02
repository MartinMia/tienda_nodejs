import { Request, Response } from "express";
import IPersonas from "../interfaces/personas.interface";
import Persona from "../models/personas.model";

// Get all resources
export const index = async (req: Request, res: Response) => {
    // agregar filtros

    try {
        let personas = await Persona.find();

        res.json(personas);
    } catch (error) {
        res.status(500).send('Algo salió mal');
    }
};

// Get one resource
export const show = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let persona = await Persona.findById(id);

        if (!persona)
            res.status(404).send(`No se encontró la persona con id: ${id}`);
        else
            res.json(persona);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Create a new resource
export const store = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;

        const persona: IPersonas = new Persona({
            nombreCompleto: data.nombreCompleto,
            email: data.email,
            contraseña: data.contraseña,
            telefono: data.telefono,
            rol: data.rol,
        });

        await persona.save();

        res.status(200).json(persona);
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
        let persona = await Persona.findById(id);

        if (!persona)
            return res.status(404).send(`No se encontró la persona con id: ${id}`);
        
        if (data.nombreCompleto) persona.nombreCompleto = data.nombreCompleto;
        if (data.email) persona.email = data.email;
        if (data.contraseña) persona.contraseña = data.contraseña;
        if (data.telefono) persona.telefono = data.telefono;
        if (data.rol) persona.rol = data.rol;
        if (data.estado) persona.estado = data.estado;

        await persona.save();
        
        res.status(200).json(persona);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Delete a resource
export const destroy = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let persona = await Persona.findByIdAndDelete(id);

        if (!persona)
            res.status(404).send(`No se encontró la persona con el id: ${id}`);
        else
            res.status(200).json(persona);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};