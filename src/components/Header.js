import React from 'react';
import propTypes from 'prop-types';

const Header = ({ message }) => {
  return (
    <div className="header-container text-center">
      <h1 className="header">&#129299; Learning With Idan &#129327;</h1>
      <hr />
      <h2 className="sub-header">{message}</h2>
    </div>
  );
};

Header.propTypes = {
  message: propTypes.string.isRequired
};

export default Header;