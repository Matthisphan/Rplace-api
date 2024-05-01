const express = require('express');
const Grid = require('../models/Grid');
const verifyToken = require('../utils/veriftoken');

const router = express.Router();

router.get('/grid', verifyToken, async (req, res) => {
  try {
    const grid = await Grid.findOne().sort({ createdAt: -1 });
    if (grid) {
      res.status(200).json(grid);
    } else {
      res.status(200).json({ grid: [] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error retrieving grid');
  }
});

module.exports = router;
