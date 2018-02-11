import React, { Component } from 'react';
import '../style/App.css';
import Navbar from './Navbar'
import Body from './Body'
import Space from './Games/SpamSpacebar'
import Timer from './Games/Timer'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      playerName: 'Unknown Player',
      page: ''
    }
  }

  renderNav() {
    if (this.state.page === 'landing') {
      return <Navbar playerName={this.state.playerName} page={this.state.page} />
    }
  }

  render() {
    return (
      <div className="App">
        {this.renderNav()}
        <Body>
          {/* <Space /> */}
          <Timer />
        </Body>
      </div>
    );
  }
}

export default App;
