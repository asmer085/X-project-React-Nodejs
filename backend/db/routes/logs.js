const express = require('express');
const router = express.Router();
const { Log } = require("../../db/models"); 

// Route for creating a new log
router.post('/logs', async (req, res) => {
  try {
    const log = await Log.create(req.body);
    res.status(201).json(log);
  } catch (error) {
    res.status(500).json({ message: 'Failed to create log' });
  }
});

// Route for getting all logs
router.get('/logs', async (req, res) => {
  try {
    const logs = await Log.findAll();
    res.status(200).json(logs);
  } catch (error) {
    res.status(500).json({ message: 'Failed to get logs' });
  }
});

module.exports = router;
