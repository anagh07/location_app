const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const geocoder = require('../utils/geocoder');

const store = new Schema({
  storeID: {
    type: String,
    required: [true, 'Please provide store ID'],
    unique: true,
    trim: true,
    maxlength: [10, 'Store ID must be 10 characters or less'],
  },
  address: {
    type: String,
    required: [true, 'Please provide an address'],
  },
  location: {
    type: {
      type: String,
      enum: ['Point'],
    },
    coordinates: {
      type: [Number],
      index: '2dsphere',
    },
    formattedAddress: String,
  },
  createdOn: {
    type: Date,
    default: Date.now,
  },
});

// Geocode to create the location prop
store.pre('save', async function (next) {
  const tempLocation = await geocoder.geocode(this.address);
  // console.log(tempLocation);
  this.location = {
    type: 'Point',
    coordinates: [tempLocation[0].latitude, tempLocation[0].longitude],
    formattedAddress: tempLocation[0].formattedAddress,
  };
  // console.log(this.location);
  this.address = undefined;
  next();
});

module.exports = mongoose.model('Store', store);
