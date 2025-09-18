import { Router } from 'express';
import { UserController } from '../controllers/user.js'

const route = Router();

route.post('/', UserController.store);
route.get('/:id', UserController.show); //: faz com que o id se torne um params (variável)
route.get('/', UserController.index);
route.delete('/:id', UserController.del);
route.put('/:id', UserController.put);

export default route;

