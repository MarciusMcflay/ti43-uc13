import { Router } from 'express';
import { HabitController } from '../controllers/habit'

const route = Router();

route.post('/', HabitController.store);

export default route;