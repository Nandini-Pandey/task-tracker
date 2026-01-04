import {
  createTask,
  getTasks,
  updateTask,
  deleteTask,
} from "../service/taskService.js";

export const addTask = async (req, res, next) => {
  try {
    const task = await createTask({
      ...req.body,
      userId: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Task created successfully",
      data: task,
    });
  } catch (error) {
    next(error);
  }
};

export const listTasks = async (req, res, next) => {
  try {
    const tasks = await getTasks(req.user.id);

    res.status(200).json({
      success: true,
      data: tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const editTask = async (req, res, next) => {
  try {
    const updatedTask = await updateTask(
      req.params.id,
      req.body,
      req.user.id
    );

    res.status(200).json({
      success: true,
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (error) {
    next(error);
  }
};

export const removeTask = async (req, res, next) => {
  try {
    await deleteTask(req.params.id, req.user.id);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};
