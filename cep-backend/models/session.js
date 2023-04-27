const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true
  },
  fileUrl: {
    type: String,
    required: true
  }
});

const sessionModel = mongoose.model('sessions', sessionSchema);

module.exports = sessionModel;