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
      gameState: 'waiting',
      won: null
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
    socket.on('quit', () => {
      this.setState({ gameState: 'quit' });
    });
    socket.on('winner', () => {
      this.setState({ won: true });
    });
    socket.on('loser', () => {
      this.setState({ won: false });
    });
    socket.on('tie', () => {
      this.setState({ won: 'heck' });
    });
  }

  endGame() {
    socket.emit('end');
    this.setState({ gameState: 'end' });
  }

  renderScreen() {
    switch (this.state.gameState) {
      case 'ready':
        return (
          <div className="game">
            <Game socket={socket} endGame={() => this.endGame()} />
            <Timer endGame={() => this.endGame()} />
          </div>
        );
      case 'end':
        return <EndScreen socket={socket} won={this.state.won} />;
      case 'quit':
        return <div>Your Partner Left</div>;
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
