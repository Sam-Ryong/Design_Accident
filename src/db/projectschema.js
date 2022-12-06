import mongoose from 'mongoose';

const projectSchema = mongoose.Schema({
  Pname: { type: String },
  category: { type: String },
  participant: [{ type: String }],
  commit: { type: Array },
  context: { type: String },
});

const Project = mongoose.model('projects', projectSchema); //최종할때 모델명 변경할것

module.exports = { Project };
