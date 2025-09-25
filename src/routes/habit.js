import { Router } from 'express';
import { HabitController } from '../controllers/habit.js'

const route = Router();

route.post('/', HabitController.store);
route.get('/', HabitController.index);
route.get('/:id', HabitController.show);
route.put('/:id', HabitController.put);
route.delete('/:id', HabitController.del);

export default route;