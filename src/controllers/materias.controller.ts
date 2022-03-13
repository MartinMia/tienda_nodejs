import { Request, Response } from "express";
import IMateria from "../interfaces/materias.interface";
import Alumno from "../models/alumnos.model";
import Materia from "../models/materias.model";

// Get all resources
export const index = async (req: Request, res: Response) => {
    // agregar filtros

    try {
        const { ...data } = req.query; 
        let filters = { ...data };
        
        if (data.nombre) {
            filters = { ...filters, nombre: {$regex: data.nombre, $options: 'i'} }
        }

        let materias = await Materia
            .find(filters)
            // .populate('alumnos', 'id dni carrera');
            .populate({ path: 'alumnos', select: ['id', 'dni', 'carrera'] }); 

        res.json(materias);
    } catch (error) {
        res.status(500).send('Algo salió mal');
    }
};

// Get one resource
export const show = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let materia = await Materia.findById(id);

        if (!materia)
            res.status(404).send(`No se encontró la materia con id: ${id}`);
        else
            res.json(materia);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Create a new resource
export const store = async (req: Request, res: Response) => {
    try {
        const { ...data } = req.body;

        const materia: IMateria = new Materia({
            nombre: data.nombre,
            duracion: data.duracion,
            estado: data.estado,
        });

        await materia.save();

        res.status(200).json(materia);
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
        let materia = await Materia.findById(id);

        if (!materia)
            return res.status(404).send(`No se encontró la materia con id: ${id}`);
        
        if (data.nombre) materia.nombre = data.nombre;
        if (data.duracion) materia.duracion = data.duracion;
        if (data.estado) materia.estado = data.estado;

        await materia.save();
        
        res.status(200).json(materia);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

// Delete a resource
export const destroy = async (req: Request, res: Response) => {
    const id = req?.params?.id;
    try {
        let materia = await Materia.findByIdAndDelete(id);

        if (!materia)
            res.status(404).send(`No se encontró el película con id: ${id}`);
        else
          // falta implementar
          res.status(200).json(materia);
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

export const inscribirAlumno = async (req: Request, res: Response) => {
    const materiaId = req?.params?.materiaId;
    const alumnoId = req?.params?.alumnoId;
    try {
        let materia = await Materia.findById(materiaId);
        let alumno = await Alumno.findById(alumnoId);

        if (!materia || !alumno)
            res.status(404).send(`No se encontró la materia o el alumno indicado.`);
        else {
            // buscar info acerca de transacciones

            await alumno?.materias.push(materia?.id);
            await materia?.alumnos.push(alumno?.id);
            await alumno?.save();
            await materia?.save();
            res.status(201).json(materia);
        }
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};

export const borrarInscripcionAlumno = async (req: Request, res: Response) => {
    const materiaId = req?.params?.materiaId;
    const alumnoId = req?.params?.alumnoId;

    try {
        let materia = await Materia.findById(materiaId);
        let alumno = await Alumno.findById(alumnoId);

        if (!materia || !alumno)
            res.status(404).send(`No se encontró la materia o el alumno indicado.`);
        else {
            // buscar info acerca de transacciones
            let indiceAlumno = Number(materia?.alumnos.indexOf(alumnoId));
            let indiceMateria = Number(alumno?.materias.indexOf(materiaId));

            if (indiceAlumno !== -1) {
                materia?.alumnos.splice(indiceAlumno,1);
                await materia?.save();
            }

            if (indiceMateria !== -1) {
                alumno?.materias.splice(indiceMateria,1);
                await alumno?.save();
            }

            res.status(201).json(materia);
        }
    } catch (error) {
        res.status(500).send('Algo salió mal.');
    }
};