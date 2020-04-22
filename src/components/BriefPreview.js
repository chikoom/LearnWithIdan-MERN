import React, { Component } from 'react';
import propTypes from 'prop-types';

class BriefPreview extends Component {
  componentClicked = () => {
    this.props.onBriefClick(this.props._id);
  };
  render() {
    return(
      <div className="link BriefPreview" onClick={this.componentClicked}>
        <h3 className="lessonName">
          {this.props.lessonName}   
        </h3>
        <h4 className="briefName">
          {this.props.briefName}
        </h4>
      </div>
    );
  }
}

BriefPreview.propTypes = {
  _id: propTypes.string.isRequired,
  lessonName: propTypes.string.isRequired,
  briefName: propTypes.string.isRequired,
  onBriefClick: propTypes.func.isRequired
};

export default BriefPreview;