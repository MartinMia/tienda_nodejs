import { Router } from 'express';
import { body, param, query } from 'express-validator';
import * as productoController from '../controllers/productos.controller';
import { validProductoId } from '../helper/db-validator';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/', [
  body('nombre', 'El nombre es obligatorio').isString(),
  body('precio', 'El precio es obligatorio').isInt({ min: 1, max: 1000000}),
  body('stock', 'El stock es obligatorio').isInt({ min: 0}),
  body('estado', 'El estado es obligatorio').isString().isIn(['nuevo', 'usado']),
  validateFields
], productoController.store);

router.get('/', [
  query('nombre', 'El nombre debe tener como minimo 2 caracteres').optional().isString().isLength({ min: 2, max: 10 }),
  validateFields
],productoController.index);

router.get('/:id', [
  param('id', 'El id debe cumplir con el formato de id de mongo').isMongoId(),
  validateFields
],productoController.show);

router.put('/:id', productoController.update);
router.delete('/:id', productoController.destroy);

export default router;