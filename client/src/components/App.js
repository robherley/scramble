import React, { Component } from 'react';
import '../style/App.css';
// import Navbar from './Navbar';
import Body from './Body';
import Timer from './Games/Timer';
import Game from './Games';
import EndScreen from './EndScreen';
import openSocket from 'socket.io-client';
const socket = openSocket();

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentWillMount() {
    socket.on('msg', data => {
      console.log(data);
      this.setState({ ...data });
    });
  }

  componentWillUnmount() {}

  endGame() {
    this.setState({ gameRunning: !this.state.gameRunning }, () => {
      console.log(this.state.gameRunning);
    });
  }

  renderScreen() {
    console.log('running renderScreen');
    if (this.state.gameRunning) {
      return (
        <div className="game">
          <Game />
          <Timer endGame={() => this.endGame()} />
        </div>
      );
    }
    console.log('ending screen');
    return <EndScreen />;
  }

  render() {
    const { id, room } = this.state;
    return (
      <div className="App">
        <div style={{ display: 'flex', justifyContent: 'space-around' }}>
          <span>
            <b>ID:</b> {id}
          </span>
          <span>
            <b>Room:</b> {room}
          </span>
        </div>
        <Body>{this.renderScreen()}</Body>
      </div>
    );
  }
}

export default App;
