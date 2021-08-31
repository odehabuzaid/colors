'use strict';
const axios = require('axios');
const UsersModel = require('../models/colors.model');

// Endpoint for testing
const home = (req, res) => {
  res.send('am alive... :) ');
};
// Call the colors api here and return the results
const retreiveItemsController = (req, res) => {
  const requestConfig = {
    method: 'get',
    baseURL: process.env.COLORS_API_URL,
  };
  axios(requestConfig)
    .then((response) => {
      res.send(response.data);
    })
    .catch((err) => err);
};
// Get favorite colors from MongoDB
const getFavoriteColors = (req, res) => {
  const email = req.query.email;
  UsersModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else if (user) {
      res.send(user);
    } else {
      let newUser = new UsersModel({
        email: email,
        colors: [
          {
            title: 'dutch teal',
            imageUrl:
              'http://www.colourlovers.com/img/1693A5/100/100/dutch_teal.png',
          },
        ],
      });
      newUser.save();
      res.send(newUser);
    }
  });
};
// Create new fav color endpoint
const createItemController = (req, res) => {
  const { title, imageUrl, email } = req.query;
  let newFavColor = { title: title, imageUrl: imageUrl };
  UsersModel.findOne({ email: email }, (err, user) => {
    if (err) {
      console.log(err);
    } else {
      let color = user.colors.filter((item) => item.title === title);
      if (color.length > 0) {
        res.send('allready Favorite');
      } else {
        user.colors.push(newFavColor);
        user.save();
        res.send('added successfully');
      }
    }
  });
};

// update coffee from MongoDB
const updateItemController = (req, res) => {
  const { title, imageUrl, index } = req.query;
  UsersModel.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.log(error);
    } else {
      user.colors[index].title = title;
      user.colors[index].imageUrl = imageUrl;
      user.save();
      res.send('updated Successfully');
    }
  });
};

// delete coffee from MongoDB
const deleteItemController = (req, res) => {
  const { index } = req.query;
  UsersModel.findById({ _id: req.params.id }, (err, user) => {
    if (err) {
      console.err(err);
    } else {
      user.colors.splice(index, 1);
      user.save();
      res.send('deleted Successfully');
    }
  });
};

module.exports = {
  home,
  getFavoriteColors,
  createItemController,
  updateItemController,
  deleteItemController,
  retreiveItemsController,
};
