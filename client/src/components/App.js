import React, { Component } from 'react';
import '../style/App.css';
import Navbar from './Navbar';
import Body from './Body';
import Timer from './Games/Timer';
import Game from './Games';
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
        <Body>
          <Game socket={socket} />
          <Timer />
        </Body>
      </div>
    );
  }
}

export default App;
