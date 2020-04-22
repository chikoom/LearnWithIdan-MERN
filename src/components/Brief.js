import React, { Component } from 'react';
import propTypes from 'prop-types';

class Brief extends Component {
  render() {
    return(
      <div className="Brief">
        <div className="brief-view-description">
          {this.props.description}
        </div>
        <div className="goto-brief-list-link link" onClick={this.props.gotoBriefListClick}>
          Back to Briefs &gt;&gt;
        </div>
      </div>
    );
  }
}

Brief.propTypes = {
  description: propTypes.string.isRequired,
  gotoBriefListClick: propTypes.func.isRequired,
};

export default Brief;