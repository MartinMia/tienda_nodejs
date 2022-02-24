import { Router } from 'express';
import * as productoController from '../controllers/productos.controller';

const router = Router();

router.post('/', productoController.store);
router.get('/', productoController.index);
router.get('/:id', productoController.show);
router.put('/:id', productoController.update);
router.delete('/:id', productoController.destroy);

export default router;