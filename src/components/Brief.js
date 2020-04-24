import React, { Component } from 'react';
import propTypes from 'prop-types';

class Brief extends Component {
  componentDidMount(){
    this.props.fetchAnswers(this.props.answerIds);
  }
  onAnswerSubmit = (event) => {
    event.preventDefault();
    const submittedAnswer = this._input.value;
    if(String(submittedAnswer).length <= 2) {
      this._input.value = '';
    } else {
      this.props.addAnswer(submittedAnswer, this.props._id);
      this._input.value = '';
    }
  };
  render() {
    return(
      <div className="Brief">
        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Brief Description</h3>
          </div>
          <div className="panel-body">
            <div className="brief-view-description">
              {this.props.description}
            </div>
          </div>
        </div>

        <div className="panel panel-default">
          <div className="panel-heading">
            <h3 className="panel-title">Submitted Answers</h3>
          </div>
          <div className="panel-body">
            <ul className="list-group">
              {this.props.answerIds.map(answerId => 
                <li className="list-group-item submittedAnswer" key={answerId}>
                  {this.props.lookupAnswer(answerId).answer}
                </li>
              )}
            </ul>
          </div>
        </div>

        <div className="panel panel-info">
          <div className="panel-heading">
            <h3 className="panel-title">Submit a new answer:</h3>
          </div>
          <div className="panel-body">
            <form onSubmit={this.onAnswerSubmit}>
              <div className="input-group">
                <input 
                  type="text" 
                  placeholder="New Name Here..." 
                  className="form-control"
                  ref={(ref) => this._input = ref} />
                <span className="input-group-btn">
                  <button type="submit" className="btn btn-info">Sumbit</button>
                </span>
              </div>
            </form>
          </div>
          <div className="goto-brief-list-link btn btn-primary"
            onClick={this.props.gotoBriefListClick}>
            Back to Briefs &gt;&gt;
          </div>
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
  addAnswer: propTypes.func.isRequired,
  _id: propTypes.string.isRequired,
};

export default Brief;