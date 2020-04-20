import React from 'react';
import Header from './Header';


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
      </div>
    );
  }
}

export default App;