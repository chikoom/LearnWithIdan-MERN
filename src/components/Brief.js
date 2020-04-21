import React, { Component } from 'react';
import propTypes from 'prop-types';

class Brief extends Component {
  render() {
    return(
      <div className="Brief">
        {this.props.description}
      </div>
    );
  }
}

Brief.propTypes = {
  description: propTypes.number.isRequired
};

export default Brief;