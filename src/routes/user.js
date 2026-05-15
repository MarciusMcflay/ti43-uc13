import { Router } from 'express';
import { UserController } from '../controllers/user.js'
import { auth } from '../middlewares/auth.js';

const route = Router();

route.post('/', UserController.store);
route.post('/login', UserController.login);
route.get('/:id', UserController.show); //: faz com que o id se torne um params (variável)
route.get('/', auth, UserController.index);
route.delete('/:id', auth, UserController.del);
route.put('/:id', auth, UserController.put);

export default route;

