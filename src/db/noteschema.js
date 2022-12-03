import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  date: {
    type: Date,
    default: Date.now(),
  },
  context: {
    type: String,
  },
  writer: {
    type: String,
  },
});

const Notes = mongoose.model('Notes', noteSchema); //최종할때 모델명 변경할것

module.exports = { Notes };
