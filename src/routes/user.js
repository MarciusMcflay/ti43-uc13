import { Router } from 'express';
import { UserController } from '../controllers/user.js'

const route = Router();

route.post('/', UserController.store);
route.get('/:id', UserController.show);
route.get('/', UserController.index);

export default route;

