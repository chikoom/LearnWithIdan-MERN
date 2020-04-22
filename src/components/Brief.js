import React, { Component } from 'react';
import propTypes from 'prop-types';

class Brief extends Component {
  componentDidMount(){
    this.props.fetchAnswers(this.props.answerIds);
  }
  render() {
    return(
      <div className="Brief">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Contest Description</h3>
          </div>
          <div className="panel-body">
            <div className="brief-view-description">
              {this.props.description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Proposed Names</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.answerIds.map(answerId => 
                <li className="list-group-item" key={answerId}>
                  {this.props.lookupAnswer(answerId).answer}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Propose a New Name</h3>
          </div>
          <div className="panel-body">
            <form>
              <div className="input-group">
                <input type="text" placeholder="New Name Here..." className="form-control" />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
        </div>

        <div className="goto-brief-list-link link"
          onClick={this.props.gotoBriefListClick}>
          Back to Briefs &gt;&gt;
        </div>
      </div>
    );
  }
}

Brief.propTypes = {
  description: propTypes.string.isRequired,
  gotoBriefListClick: propTypes.func.isRequired,
  fetchAnswers: propTypes.func.isRequired,
  answerIds: propTypes.array.isRequired,
  lookupAnswer: propTypes.func.isRequired,
};

export default Brief;