import { Router } from 'express';
import * as personaController from '../controllers/personas.controller';
import { body } from 'express-validator';
import { validPersonaEmail } from '../helper/db-validator';
import { validateFields } from '../middlewares/validate-fields';

const router = Router();


router.post('/login', personaController.login);
router.post('/', [
  body('email').custom(validPersonaEmail),
  validateFields
],personaController.store);

router.get('/', personaController.index);
router.get('/:id', personaController.show);
router.put('/:id', personaController.update);
router.delete('/:id', personaController.destroy);


export default router;