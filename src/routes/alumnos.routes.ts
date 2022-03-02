import { Router } from 'express';
import * as alumnosController from '../controllers/alumnos.controller';

const router = Router();

router.post('/', alumnosController.store);
router.get('/', alumnosController.index);
router.get('/:id', alumnosController.show);
router.put('/:id', alumnosController.update);
router.delete('/:id', alumnosController.destroy);

export default router;