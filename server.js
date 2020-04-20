import config from './config';
import apiRouter from './api';

import express from 'express';
const server = express();

server.set('view engine', 'ejs');

server.get('/', (req,res) => {
  res.render('index', {
    content: '<h1>Express EJS Content</h1>'
  });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, () => {
  console.info(`Express server listening on port :${config.port}`);
});