// const express = require('express');
// const Task = require('../models/Task');
// const protect = require('../middleware/authMiddleware');
// const router = express.Router();

// // Get all tasks for authenticated user
// router.get('/', protect, async (req, res) => {
//   const tasks = await Task.find({ userId: req.user.id });
//   res.status(200).json(tasks);
// });

// // Create a task
// router.post('/', protect, async (req, res) => {
//   const { title, description, status, priority, dueDate } = req.body;
//   const task = new Task({ title, description, status, priority, dueDate, userId: req.user.id });
//   await task.save();
//   res.status(201).json(task);
// });

// // Update a task
// router.put('/:id', protect, async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task || task.userId.toString() !== req.user.id) {
//     return res.status(404).json({ message: 'Task not found' });
//   }

//   const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//   res.status(200).json(updatedTask);
// });

// // Delete a task
// router.delete('/:id', protect, async (req, res) => {
//   const task = await Task.findById(req.params.id);
//   if (!task || task.userId.toString() !== req.user.id) {
//     return res.status(404).json({ message: 'Task not found' });
//   }

//   await Task.findByIdAndDelete(req.params.id);
//   res.status(200).json({ message: 'Task deleted' });
// });

// module.exports = router;


const express = require('express');
const mongoose = require('mongoose');
const { check, validationResult } = require('express-validator');
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

// Get all tasks for authenticated user
router.get('/', protect, async (req, res) => {
  try {
    const tasks = await Task.find({ userId: req.user.id });
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Create a task
router.post(
  '/',
  protect,
  [
    check('title', 'Title is required').notEmpty(),
    check('status', 'Status is required').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { title, description, status, priority, dueDate } = req.body;

    try {
      const task = new Task({
        title,
        description,
        status,
        priority,
        dueDate,
        userId: req.user.id,
      });

      await task.save();
      res.status(201).json(task);
    } catch (error) {
      res.status(500).json({ message: 'Server error', error });
    }
  }
);

// Update a task
router.put('/:id', protect, async (req, res) => {
  // Check if ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    console.log("Task updated in DB:", updatedTask);
    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Delete a task
router.delete('/:id', protect, async (req, res) => {
  // Check if ObjectId is valid
  if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
    return res.status(400).json({ message: 'Invalid task ID' });
  }

  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: 'Task not found' });
    }

    if (task.userId.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Unauthorized action' });
    }

    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

module.exports = router;
