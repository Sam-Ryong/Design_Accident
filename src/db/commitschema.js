import mongoose from 'mongoose';

const commitSchema = mongoose.Schema({
  Cname: { type: String },
  Pname: { type: String },
  file: { type: String },
  participant: { type: String },
  context: { type: String },
  pointer: { type: String },
});

const Commit = mongoose.model('commits', commitSchema); //최종할때 모델명 변경할것

module.exports = { Commit };
