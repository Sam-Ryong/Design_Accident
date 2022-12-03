import express from 'express';

const globalRouter = express.Router();

globalRouter.use(express.static(__dirname + '/html'));

globalRouter.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/myprofile.html');
});

export default globalRouter;
