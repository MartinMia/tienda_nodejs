import { Router } from 'express';
import { body } from 'express-validator';
import * as alumnosController from '../controllers/alumnos.controller';
import { validPersonaId } from '../helper/db-validator';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();

router.post('/', [
  body('persona_id').custom(validPersonaId),
  validateFields
],alumnosController.store);

router.get('/', alumnosController.index);
router.get('/:id', alumnosController.show);
router.put('/:id', alumnosController.update);
router.delete('/:id', alumnosController.destroy);

export default router;