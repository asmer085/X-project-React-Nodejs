const express = require('express');
const router = express.Router();
const { WorkHour } = require('../models');

// Create a new work hour entry
router.post('/workhour/:userId/:projectId', async (req, res) => {
  try {
    const workHour = await WorkHour.create(req.body);
    res.status(201).json(workHour);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all work hour entries
router.get('/workhours', async (req, res) => {
  try {
    const workHours = await WorkHour.findAll();
    res.status(200).json(workHours);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get a specific work hour entry by its ID
router.get('/workhour/:id', async (req, res) => {
  try {
    const workHour = await WorkHour.findByPk(req.params.id);
    if (workHour) {
      res.status(200).json(workHour);
    } else {
      res.status(404).json({ message: 'Work hour not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a specific work hour entry by its ID
router.put('/workhour/:id', async (req, res) => {
  try {
    const [updated] = await WorkHour.update(req.body, {
      where: { id: req.params.id },
    });
    if (updated) {
      const updatedWorkHour = await WorkHour.findByPk(req.params.id);
      res.status(200).json(updatedWorkHour);
    } else {
      res.status(404).json({ message: 'Work hour not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a specific work hour entry by its ID
router.delete('/workhour/:id', async (req, res) => {
  try {
    const deleted = await WorkHour.destroy({
      where: { id: req.params.id },
    });
    if (deleted) {
      res.status(204).json({ message: 'Work hour deleted' });
    } else {
      res.status(404).json({ message: 'Work hour not found' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get the total hours a user has worked on a project
router.get('/workhour/:userId/:projectId', async (req, res) => {
    try {
      const totalHours = await WorkHour.sum('hours', {
        where: {
          user_id: req.params.userId,
          project_id: req.params.projectId
        }
      });
      if (totalHours) {
        res.status(200).json({ totalHours });
      } else {
        res.status(404).json({ message: 'No work hours found for this user and project' });
      }
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });
  

module.exports = router;
