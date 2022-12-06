import mongoose from 'mongoose';

const noteSchema = mongoose.Schema({
  writer: { type: String },
  reader: { type: String },
  context: { type: String },
});

const Note = mongoose.model('notes', noteSchema); //최종할때 모델명 변경할것

module.exports = { Note };
