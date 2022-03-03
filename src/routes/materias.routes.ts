import { Router } from 'express';
import { body } from 'express-validator';
import * as materiasController from '../controllers/materias.controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/',materiasController.store);
// localhost:5000/api/materias/:materiaId/alumnos/:alumnoId
router.post('/:materiaId/alumnos/:alumnoId',materiasController.inscribirAlumno);
router.get('/', materiasController.index);
router.get('/:id', materiasController.show);
router.put('/:id', materiasController.update);
router.delete('/:id', materiasController.destroy);
router.delete('/:materiaId/alumnos/:alumnoId',materiasController.borrarInscripcionAlumno);

export default router;