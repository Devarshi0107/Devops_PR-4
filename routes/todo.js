// routes/todo.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Get all todos
router.get('/', async (req, res) => {
    try {
        const todos = await Todo.find();
        res.json(todos);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get one todo
router.get('/:id', getTodo, (req, res) => {
    res.json(res.todo);
});

// Create a todo
router.post('/', async (req, res) => {
    const todo = new Todo({
        title: req.body.title
    });
    try {
        const newTodo = await todo.save();
        res.status(201).json(newTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Update a todo
router.patch('/:id', getTodo, async (req, res) => {
    if (req.body.title != null) {
        res.todo.title = req.body.title;
    }
    if (req.body.completed != null) {
        res.todo.completed = req.body.completed;
    }
    try {
        const updatedTodo = await res.todo.save();
        res.json(updatedTodo);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Delete a todo
router.delete('/:id', getTodo, async (req, res) => {
    try {
        await res.todo.remove();
        res.json({ message: 'Todo Deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware function to get a todo by ID
async function getTodo(req, res, next) {
    let todo;
    try {
        todo = await Todo.findById(req.params.id);
        if (todo == null) {
            return res.status(404).json({ message: 'Todo Not Found' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
    res.todo = todo;
    next();
}

module.exports = router;
