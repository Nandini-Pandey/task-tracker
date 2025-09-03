import express from 'express';
import { addTask, listTasks, editTask, removeTask } from '../controller/taskController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addTask);
router.get('/', protect, listTasks);
router.put('/:id', protect, editTask);
router.delete('/:id', protect, removeTask);

export default router;
