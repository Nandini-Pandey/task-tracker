import express from 'express';
import { addTask, listTasks, editTask, removeTask } from '../controller/taskController.js';
import { protect } from '../middlewares/authMiddleware.js';

const taskRouter = express.Router();

taskRouter.post('/', protect, addTask);
taskRouter.get('/', protect, listTasks);
taskRouter.put('/:id', protect, editTask);
taskRouter.delete('/:id', protect, removeTask);

export default taskRouter;