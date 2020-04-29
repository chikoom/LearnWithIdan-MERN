import React from 'react';
import propTypes from 'prop-types';

import Header from './Header';
import BriefList from './BriefList';
import Brief from './Brief';
import * as api from '../api';

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

const onPopState = handler => {
  window.onpopstate = handler;
};

class App extends React.Component {
  static propTypes = {
    initialData: propTypes.object.isRequired
  };
  state = this.props.initialData;
  componentDidMount(){
    onPopState((event) => {
      this.setState({
        currentBriefId: (event.state || {}).currentBriefId
      });
    });
  }
  componentWillUnmount(){
    onPopState(null);
  }
  setPageHeader() {
    if(this.state.currentBriefId) {
      return this.currentBrief().lessonName;
    } else {
      return;
    }
  }
  fetchAnswers = (answerIds) => {
    if(answerIds.length == 0){
      return;
    }
    api.fetchAnswers(answerIds).then(answers => {
      this.setState({
        answers
      });
    });
  }
  lookupAnswer = (answerId) => {
    if(!this.state.answers || !this.state.answers[answerId]){
      return { answer:'Loading...' };
    }
    return this.state.answers[answerId];
  }
  fetchBrief = (briefId) => {
    pushState(
      {currentBriefId: briefId},
      `/brief/${briefId}`
    );
    api.fetchBrief(briefId).then( brief => {
      this.setState({
        currentBriefId: brief._id,
        briefs: {
          ...this.state.briefs,
          [brief._id]:brief
        }
      });
    });  
  };
  fetchBriefList = () => {
    pushState(
      { currentBriefId: null},
      '/'
    );
    api.fetchBriefList().then( briefs => {
      this.setState({
        currentBriefId: null,
        briefs
      });
    });
  };
  currentBrief() {
    return this.state.briefs[this.state.currentBriefId];
  }
  currentContent() { 
    if(this.state.currentBriefId) {
      return <Brief 
        gotoBriefListClick= {this.fetchBriefList}
        fetchAnswers= {this.fetchAnswers}
        lookupAnswer= {this.lookupAnswer}
        addAnswer= {this.addAnswer}
        {...this.currentBrief()} />;
    } else {
      return <BriefList 
        onBriefClick={this.fetchBrief}
        briefs={this.state.briefs} />;
    }
  }
  addAnswer = (newAnswer, briefId) => {
    api.addAnswer(newAnswer, briefId).then(resp =>
      this.setState({
        briefs: {
          ...this.state.briefs,
          [resp.updatedBrief._id]:resp.updatedBrief
        },
        answers: {
          ...this.state.answers,
          [resp.newAnswer._id]:resp.newAnswer
        }
      })
    )
      .catch(console.error);
  }
  render() {
    return (
      <div className="App">
        <Header message={this.setPageHeader()} onTitleClicked={this.fetchBriefList} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;