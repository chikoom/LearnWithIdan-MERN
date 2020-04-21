import React from 'react';
import ReactDOM from 'react-dom';


import App from './components/App';

ReactDOM.hydrate(
  <App initialBriefs={window.initialData.briefs} />,
  document.getElementById('root')
);

