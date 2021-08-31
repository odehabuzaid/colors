'use strict';
const mongoose = require('mongoose');

const ColorSchema = new mongoose.Schema({
  title: String,
  imageUrl: String,
});

const UserSchema = new mongoose.Schema({
  email: String,
  colors: [ColorSchema],
});

const UsersModel = mongoose.model('User', UserSchema);



module.exports = UsersModel;
