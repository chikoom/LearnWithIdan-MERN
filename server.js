import config from './config';
import serverRender from './serverRender';
import apiRouter from './api';

import sassMiddleware from 'node-sass-middleware';
import path from 'path';
import favicon from 'serve-favicon';
import express from 'express';
import bodyParser from 'body-parser';

const server = express();

server.use(favicon(path.join(__dirname, '/public', 'favicon.ico')));
server.use(bodyParser.json());


server.use(sassMiddleware({
  src: path.join(__dirname, 'sass'),
  dest: path.join(__dirname, '/public'),
}));

server.set('view engine', 'ejs');

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