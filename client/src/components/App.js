import React, { Component } from 'react';
import '../style/App.css';
import Timer from './Games/Timer';
import Game from './Games';
import Quit from './Screens/Quit';
import Waiting from './Screens/Waiting';
import End from './Screens/End';
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
    socket.on('ready', data => {
      this.setState({ gameState: 'ready', ...data });
    });
    socket.on('quit', () => {
      this.setState({ gameState: 'quit' });
    });
    socket.on('winner', () => {
      this.setState({ gameState: 'end', won: true });
    });
    socket.on('loser', () => {
      this.setState({ gameState: 'end', won: false });
    });
    socket.on('tie', () => {
      this.setState({ gameState: 'end', won: 'heck' });
    });
  }

  endGame() {
    socket.emit('end');
  }

  renderScreen() {
    switch (this.state.gameState) {
      case 'ready':
        return (
          <div className="game">
            <Game
              socket={socket}
              gameId={this.state.gameId}
              endGame={() => this.endGame()}
              randomNum={this.state.randomNum}
            />
            <Timer endGame={() => this.endGame()} />
          </div>
        );
      case 'end':
        return <End socket={socket} won={this.state.won} />;
      case 'quit':
        return <Quit />;
      default:
        return <Waiting />;
    }
  }

  render() {
    const { id, room } = this.state;
    return (
      <div className="App">
        {this.renderScreen()}
        <div
          style={{
            marginTop: 'auto',
            display: 'flex',
            justifyContent: 'space-around',
            width: '100%'
          }}
        >
          <span>
            <b>ID:</b> {id}
          </span>
          <span>
            <b>Room:</b> {room}
          </span>
        </div>
      </div>
    );
  }
}

export default App;
