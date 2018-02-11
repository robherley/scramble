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
    this.state = {
      gameState: 'waiting'
    };
  }

  componentWillMount() {
    socket.on('msg', data => {
      console.log(data);
      this.setState({ ...data });
    });
    socket.on('ready', () => {
      this.setState({ gameState: 'ready' });
    });
  }

  componentWillUnmount() {
    // eventually remove socket
  }

  endGame() {
    this.setState({ gameState: 'end' });
  }

  renderScreen() {
    switch (this.state.gameRunning) {
      case 'ready':
        return (
          <div className="game">
            <Game socket={socket} />
            <Timer endGame={() => this.endGame()} />
          </div>
        );
      case 'end':
        return <EndScreen />;
      default:
        return <div>Waiting to joint 420 🌲🔥!</div>;
    }
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
