import React from 'react';
import ReactDOM from 'react-dom';
import propTypes from 'prop-types';


const App = (props) => {
  return (
    <div>
      <h2 className="text-container">
        Hello React Component
      </h2>
      <p>{props.headerMessage}</p>
    </div>
  );
};

App.propTypes = {
  headerMessage: propTypes.string.isRequired
};

App.defaultProps = {
  headerMessage: 'Default Message!'
};

ReactDOM.render(
  <App headerMessage="A props message" />,
  document.getElementById('root')
);