import React from 'react';
import axios from 'axios';
import Header from './Header';
import BriefPreview from './BriefPreview';

class App extends React.Component {
  state = { 
    pageHeader: 'Learning With  Idan',
    briefs: []
  }
  componentDidMount(){
    console.log('component did mount');
    axios.get('/api/briefs')
      .then( response => {
      // handle success
        this.setState({
          briefs: response.data.briefs
        });
      })
      .catch( error => {
      // handle error
        console.log(error);
      })
      .then( () => {
      // always executed
      });
    
    console.log('briefs added');
  }
  componentWillUnmount(){
    console.log('component will unmount');
  }
  render() {
    return (
      <div className="App">
        <Header message={this.state.pageHeader} />
        <div>
          {this.state.briefs.map(brief => <BriefPreview key={brief.id} {...brief} />)}
        </div>
      </div>
    );
  }
}

export default App;