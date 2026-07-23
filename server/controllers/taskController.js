const Task = require('../models/Task');
const Submission = require('../models/Submission');
const mongoose = require('mongoose');

// @desc  Get all tasks (paginated)
// @route GET /api/tasks?page=1&limit=10
// @access Admin
const getAllTasks = async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    // Cap at 100 to prevent abuse — no client should ever need more than 100 per page
    const limit = Math.min(100, Math.max(1, parseInt(req.query.limit) || 10));
    const skip = (page - 1) * limit;
    const search = req.query.search || '';
    const status = req.query.status || 'All';

    // Build dynamic filter for DB-level search and status filtering
    const query = {};
    if (status !== 'All') query.status = status;
    if (search) query.title = { $regex: search, $options: 'i' };

    const [tasks, total, openCount, submittedCount, approvedCount] =
      await Promise.all([
        Task.find(query)
          .populate('assignedTo', 'name email')
          .populate('createdBy', 'name')
          .sort({ createdAt: -1 })
          .skip(skip)
          .limit(limit)
          .lean(),
        Task.countDocuments(query),
        Task.countDocuments({ status: 'Open' }),
        Task.countDocuments({ status: 'Submitted' }),
        Task.countDocuments({ status: 'Approved' }),
      ]);

    res.json({
      tasks,
      stats: {
        open: openCount,
        submitted: submittedCount,
        approved: approvedCount,
      },
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Get single task
// @route GET /api/tasks/:id
// @access Admin
const getTaskById = async (req, res) => {
  try {
    // Validate ID format first to prevent CastError from Mongoose
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid task ID' });
    }

    const task = await Task.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name');

    if (!task) return res.status(404).json({ message: 'Task not found' });

    // Authorization: Talents can only view tasks that are globally Open or assigned to them
    if (req.user && req.user.role === 'Talent') {
      const isAssigned = task.assignedTo && task.assignedTo._id.toString() === req.user._id.toString();
      const isOpen = task.status === 'Open';
      if (!isOpen && !isAssigned) {
        return res.status(403).json({ message: 'Access denied: You are not authorized to view this task' });
      }
    }

    res.json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Create a task
// @route POST /api/tasks
// @access Admin
const createTask = async (req, res) => {
  const { title, description, status, assignedTo, dueDate } = req.body;

  try {
    const task = await Task.create({
      title,
      description,
      status,
      assignedTo: assignedTo || null,
      dueDate,
      createdBy: req.user._id,
    });

    res.status(201).json(task);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Update a task
// @route PUT /api/tasks/:id
// @access Admin
const updateTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // including internal fields like createdBy or __v
    const updated = await Task.findByIdAndUpdate(
      req.params.id,
      { ...req.body },
      { new: true }
    ).populate('assignedTo', 'name email');

    res.json(updated);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc  Delete a task
// @route DELETE /api/tasks/:id
// @access Admin
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: 'Task not found' });
    // Delete associated submissions to prevent orphaned records
    await Submission.deleteMany({ taskId: req.params.id });
    await Task.findByIdAndDelete(req.params.id);

    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getAllTasks, getTaskById, createTask, updateTask, deleteTask };
