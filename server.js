'use strict';
const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();
app.use(express.json());
app.use(cors());
const port = process.env.port;
const {
  home,
  getFavoriteColors,
  createItemController,
  updateItemController,
  deleteItemController,
  retreiveItemsController,
} = require('./controllers/colors.controller');

mongoose.connect(`mongodb://127.0.0.1:27017/finalexam`, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.get('/', home);
app.get('/fav-list', getFavoriteColors);
app.get('/retreive', retreiveItemsController);
app.post('/create', createItemController);
app.put('/update/:id', updateItemController);
app.delete('/delete/:id', deleteItemController);

app.listen(port, () => {
  console.log('listening to port 8000');
});
