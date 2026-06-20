import crypto from 'crypto';

// db simulated of tasks
let tasks = [];

export const getTasks = (req, res) => {
  res.json(tasks);
};

export const createTask = (req, res) => {
  const { title, description } = req.body;

  if (!title || !description) {
    return res.status(400).json({ error: "title and description are required" });
  }

  const newTask = {
    id: crypto.randomUUID(),
    title,
    description
  };

  tasks.push(newTask);
  res.status(201).json({
    message: 'task created successfully',
    task: newTask
  });
};

export const deleteTask = (req, res) => {
  const { id } = req.params;
  const taskIndex = tasks.findIndex(task => task.id === id);

  if (taskIndex === -1) {
    return res.status(404).json({ error: 'task not found' });
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  res.status(200).json({
    message: 'task deleted successfully',
    task: deletedTask[0]
  });
};