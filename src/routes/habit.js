import { Router } from 'express';
import { HabitController } from '../controllers/habit.js'

const route = Router();

route.post('/', HabitController.store);

export default route;