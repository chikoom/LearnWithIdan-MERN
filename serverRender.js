import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const serverRender = () =>
  axios.get(`${config.serverUrl}/api/briefs`)
    .then(resp => {
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialBriefs={resp.data.briefs} />
        ),
        initialData: resp.data
      };    
    });

export default serverRender;
