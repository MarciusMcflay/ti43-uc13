import { Router } from 'express';
import { UserController } from '../controllers/user.js'
import { verificaToken } from '../middlewares/auth.js';

const route = Router();

route.post('/', UserController.store);
route.post('/login', UserController.login);
route.get('/:id', UserController.show); //: faz com que o id se torne um params (variável)
route.get('/', UserController.index);
route.delete('/:id',verificaToken, UserController.del);
route.put('/:id',verificaToken, UserController.put);

export default route;

