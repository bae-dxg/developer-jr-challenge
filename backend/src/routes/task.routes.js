import { Router } from 'express';
import { getTasks, createTask, deleteTask } from '../controllers/task.controller.js';

const router = Router();

router.get('/tasks', getTasks);
router.post('/tasks', createTask);
router.delete('/tasks/:id', deleteTask);

export default router;