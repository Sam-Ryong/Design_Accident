import db from '../db/db';
import { Notes } from '../db/noteschema';
import express from 'express';

const featureRouter = express.Router();

db;

featureRouter.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/html/notes.html');
});

featureRouter.get('/notes', (req, res) => {
  res.sendFile(__dirname + '/html/notes.html');
});

featureRouter.post('/notes/write', (req, res) => {
  const note = new Notes(req.body);
  note.save((err) => {
    if (err) return res.json({ success: false, err });
    return res.sendFile(__dirname + '/html/notes.html');
  });
});
export default featureRouter;
