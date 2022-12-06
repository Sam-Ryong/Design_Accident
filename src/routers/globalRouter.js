import express from 'express';

const globalRouter = express.Router();

globalRouter.use(express.static(__dirname + '/html'));

globalRouter.get('/', (req, res) => {
  res.sendFile(__dirname + '/html/main1.html');
});

export default globalRouter;
