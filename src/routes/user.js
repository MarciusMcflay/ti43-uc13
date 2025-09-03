import { Router } from 'express';
import { UserController } from '../controllers/user'

const route = Router();

route.post('/', UserController.store);

export default route;

