import React from 'react';
import propTypes from 'prop-types';

const Header = ({ message, onTitleClicked }) => {
  return (
    <header className="header-container text-center">
      <h1 className="link header" onClick={onTitleClicked}>&#129299; Learning With Idan &#129327;</h1>
      <hr />
      <h2 className="sub-header">{message}</h2>
    </header>
  );
};


Header.propTypes = {
  message: propTypes.string,
  onTitleClicked: propTypes.func.isRequired
};

Header.defaultProps = {
  message: 'Assignment List'
};

export default Header;