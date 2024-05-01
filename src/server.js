require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const routes_post = require('./Routes/post');
const routes_get = require('./Routes/get');
const socketIo = require('socket.io');

const app = express();
const PORT = process.env.PORT;

app.use(bodyParser.json());
app.use(cors());

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const io = socketIo(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST'],
  },
});

const Grid = require('./models/Grid');

io.on('connection', (socket) => {
  let previousGrid;
  const checkGridChange = async () => {
    const grid = await Grid.findOne().sort({ createdAt: -1 });
    if (!previousGrid || JSON.stringify(previousGrid) !== JSON.stringify(grid)) {
      socket.emit('gridUpdated', grid);
      previousGrid = grid;
    }
  };
  const interval = setInterval(checkGridChange, 1000);
  socket.on('disconnect', () => {
    clearInterval(interval);
  });
});

app.use('/api', routes_post);
app.use('/api', routes_get);
