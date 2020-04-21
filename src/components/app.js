import React from 'react';
import Header from './Header';
import BriefPreview from './BriefPreview';

class App extends React.Component {
  state = { 
    pageHeader: 'Learning With  Idan'
  }
  componentDidMount(){
    console.log('component did mount');
  }
  componentWillUnmount(){
    console.log('component will unmount');
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          {this.props.briefs.map(brief => <BriefPreview key={brief.id} {...brief} />)}
        </div>
      </div>
    );
  }
}

export default App;