import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';

/*
* Using hydrate instead of render -
* Content was initialy rendered using ReactDOMServer
*/
ReactDOM.hydrate(
  <App initialData={window.initialData} />,
  document.getElementById('root')
);

