import React from 'react';
import Header from './Header';
import BriefList from './BriefList';
import Brief from './Brief';
import * as api from '../api';

const pushState = (obj, url) =>
  window.history.pushState(obj, '', url);

class App extends React.Component {
  state = { 
    briefs: this.props.initialBriefs
  }
  componentDidMount(){
    console.log('component did mount');
  }
  componentWillUnmount(){
    console.log('component will unmount');
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
      return <Brief {...this.currentBrief()} />;
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