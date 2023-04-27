const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  userEmail: {
    type: String,
    required: true
  },
  files: [
    {
      fileName: {
        type: String,
        required: true
      },
      fileUrl: {
        type: String,
        required: true
      },
      size: {
        type: String,
        required: true
      }
    }
  ]
});

const filesModel = mongoose.model('files', fileSchema);

module.exports = filesModel;
