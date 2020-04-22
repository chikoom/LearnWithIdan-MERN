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
        currentBriefId: brief.id,
        briefs: {
          ...this.state.briefs,
          [brief.id]:brief
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
  pageHeader() {
    if(this.state.currentBriefId) {
      return this.currentBrief().lessonName;
    } else {
      return 'Learning With Idan';
    }
  }
  currentContent() { 
    if(this.state.currentBriefId) {
      return <Brief 
        gotoBriefListClick= {this.fetchBriefList}
        fetchAnswers= {this.fetchAnswers}
        lookupAnswer= {this.lookupAnswer}
        {...this.currentBrief()} />;
    } else {
      return <BriefList 
        onBriefClick={this.fetchBrief}
        briefs={this.state.briefs} />;
    }
  }
  render() {
    return (
      <div className="App">
        <Header message={this.pageHeader()} />
        {this.currentContent()}
      </div>
    );
  }
}

export default App;