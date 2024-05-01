const express = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const Grid = require('../models/Grid');
const jwt = require('jsonwebtoken');
const verifyToken = require('../utils/veriftoken');
const JWT_SECRET = process.env.JWT_SECRET;

const router = express.Router();

router.post('/register', async (req, res) => {
  const { username, password } = req.body;
  try {
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).send('User already exists');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username,
      password: hashedPassword,
    });
    await newUser.save();
    res.status(201).send('User registered successfully');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error registering user');
  }
});

router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('User not found');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).send('Incorrect password');
    } else {
      const token = jwt.sign({ _id: user._id.toString() }, JWT_SECRET, { expiresIn: '1h' });
      user.token = token;
      await user.save();
      res.status(200).send({ message: 'Login successful', token });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging in');
  }
});

router.post('/logout', verifyToken, async (req, res) => {
  const token = JSON.parse(req.headers.authorization.split(' ')[1]);
  try {
    const user = await User.findOne({ token });
    if (!user) {
      return res.status(404).send('User not found');
    }
    user.token = '';
    await user.save();
    res.status(200).send('Logout successful');
  } catch (error) {
    console.log(error);
    res.status(500).send('Error logging out');
  }
});

router.post('/grid', verifyToken, async (req, res) => {
  const { row } = req.body;
  try {
    const newGrid = new Grid({ row });
    console.log('Grid saved successfully');
    await newGrid.save();
    res.status(201).send('Grid saved successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error saving/updating grid');
  }
});

module.exports = router;
