const express = require('express');
const router = express.Router();
const db = require('../models');

// Get all tasks
router.get('/', async (req, res) => {
  try {
    const tasks = await db.Task.findAll();
    res.json(tasks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get one specific task
router.get('/:id', async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (task) {
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a task
router.post('/', async (req, res) => {
  try {
    const task = await db.Task.create(req.body);
    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Edit a task
router.put('/:id', async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (task) {
      await task.update(req.body);
      res.json(task);
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete a task
router.delete('/:id', async (req, res) => {
  try {
    const task = await db.Task.findByPk(req.params.id);
    if (task) {
      await task.destroy();
      res.status(204).end();
    } else {
      res.status(404).json({ error: 'Task not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
