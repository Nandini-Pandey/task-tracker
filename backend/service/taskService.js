import Task  from "../models/Task.js";
import mongoose from "mongoose";

export const createTask = async (taskData) => {
  const { title, description, userId } = taskData;

  if (!title || !userId) {
    throw new Error("Title and user are required");
  }

  const task = await Task.create({
    title,
    description,
    user: userId,
  });

  return task;
};

export const getTasks = async (userId) => {
  if (!userId) {
    throw new Error("User not authorized");
  }

  const tasks = await Task.find({ user: userId }).sort({ createdAt: -1 });
  return tasks;
};

export const updateTask = async (taskId, updates, userId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOne({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found or not authorized");
  }

  if (updates.title !== undefined) task.title = updates.title;
  if (updates.description !== undefined) task.description = updates.description;
  if (updates.completed !== undefined) task.completed = updates.completed;

  await task.save();
  return task;
};

export const deleteTask = async (taskId, userId) => {
  if (!mongoose.Types.ObjectId.isValid(taskId)) {
    throw new Error("Invalid task ID");
  }

  const task = await Task.findOneAndDelete({
    _id: taskId,
    user: userId,
  });

  if (!task) {
    throw new Error("Task not found or not authorized");
  }

  return;
};
