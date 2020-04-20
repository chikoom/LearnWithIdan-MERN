import React from 'react';
import propTypes from 'prop-types';

const Header = ({ message }) => {
  return (
    <h1 className="header text-center">
      {message}
    </h1>
  );
};

Header.propTypes = {
  message: propTypes.string.isRequired
};

export default Header;