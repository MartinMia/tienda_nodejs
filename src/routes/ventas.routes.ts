import { Router } from 'express';
import { body } from 'express-validator';
import * as ventasController from '../controllers/ventas.controller';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/',ventasController.store);
// localhost:5000/api/materias/:materiaId/alumnos/:alumnoId
router.post('/:productoId/productos/:productoId',ventasController.ingresarVenta);
router.get('/', ventasController.index);
router.get('/:id', ventasController.show);
router.put('/:id', ventasController.update);
router.delete('/:id', ventasController.destroy);
router.delete('/:productoId/productos/:productoId',ventasController.borrarVenta);

export default router;