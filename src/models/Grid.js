const mongoose = require('mongoose');

const gridSchema = new mongoose.Schema({
  row: [[String]],
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Grid', gridSchema);
