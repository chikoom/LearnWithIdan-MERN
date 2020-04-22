import config from './config';
import apiRouter from './api';
import sassMiddleware from 'node-sass-middleware';
import path from 'path';

import express from 'express';
import bodyParser from 'body-parser';
const server = express();
server.use(bodyParser.json());


server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, '/public'),
}));

server.set('view engine', 'ejs');

import serverRender from './serverRender';

server.get(['/', '/brief/:briefId'], (req,res) => {
  serverRender(req.params.briefId)
    .then(({initialMarkup, initialData}) => {
      res.render('index', {
        initialMarkup,
        initialData
      });
    })
    .catch(error => {
      console.error(error);
      res.status(404).send('Didn\'t found what you where looking for...');
    });
});

server.use('/api', apiRouter);
server.use(express.static('public'));

server.listen(config.port, config.host, () => {
  console.info(`Express server listening on port :${config.port}`);
});