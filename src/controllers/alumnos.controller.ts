import { Request, Response } from "express";
import IAlumnos from "../interfaces/alumnos.interface";
import Alumno from "../models/alumnos.model";

// Get all resources
export const index = async (req: Request, res: Response) => {
    // agregar filtros

    try {
        let alumnos = await Alumno.find()
            // .populate('persona_id', 'email nombreCompleto contraseña');
            .populate({ path: 'persona_id', select: ['id', 'nombreCompleto', 'email'] }); 

        res.json(alumnos);
    } catch (error) {
        res.status(500).send('Algo salió mal');
    }
};

// Get one resource
export const show = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let alumno = await Alumno.findById(id);

        if (!alumno)
            res.status(404).send(`No se encontró el alumno con id: ${id}`);
        else
            res.json(alumno);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Create a new resource
export const store = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;

        const alumno: IAlumnos = new Alumno({
            dni: data.dni,
            carrera: data.carrera,
            persona_id: data.persona_id,
        });

        await alumno.save();

        res.status(200).json(alumno);
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
        let alumno = await Alumno.findById(id);

        if (!alumno)
            return res.status(404).send(`No se encontró el alumno con id: ${id}`);
        
        if (data.dni) alumno.dni = data.dni;
        if (data.carrera) alumno.carrera = data.carrera;
        if (data.persona_id) alumno.persona_id = data.persona_id;
        if (data.estado) alumno.estado = data.estado;

        await alumno.save();
        
        res.status(200).json(alumno);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Delete a resource
export const destroy = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let alumno = await Alumno.findByIdAndDelete(id);

        if (!alumno)
            res.status(404).send(`No se encontró el alumno con el id: ${id}`);
        else
            res.status(200).json(alumno);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};