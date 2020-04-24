import React from 'react';
import ReactDOMServer from 'react-dom/server';

import App from './src/components/App';

import config from './config';
import axios from 'axios';

const getApiUrl = briefId => {
  if(briefId) {
    return `${config.serverUrl}/api/briefs/${briefId}`;
  } 
  return `${config.serverUrl}/api/briefs`;
};


const getIinitialData = (briefId, apiData) => {
  if(briefId){
    return {
      currentBriefId: apiData._id,
      briefs : {
        [apiData._id]: apiData
      }
    };
  }
  return {
    briefs: apiData.briefs
  };
};

// 
const serverRender = (briefId) =>
  axios.get(getApiUrl(briefId))
    .then(resp => {
      const initialData = getIinitialData(briefId, resp.data);
      return {
        initialMarkup: ReactDOMServer.renderToString(
          <App initialData={initialData} />
        ),
        initialData
      };    
    });

export default serverRender;
