const { Schema, model } = require('mongoose');

const itinerarySchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  completed: {
    type: Boolean,
    require: true,
    default: false,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  details: {
    type: String,
    require: true,
  },
  trips: [{
    type: Schema.Types.ObjectId,
    ref: 'Trips'
  }]
});

const Itinerary = model('Itinerary', itinerarySchema);

module.exports = Itinerary;