import React, { Component } from 'react';
import SpaceSpam from './SpamSpacebar';
import TypeFaster from './TypeFaster';

export default class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      gameId: 0,
      games: [<SpaceSpam />, <TypeFaster />]
    };
  }

  componentDidMount() {
    this.setState({
      // gameId: Math.floor(Math.random() * this.state.games.length)
      gameId: 1
    });
  }

  render() {
    const { games, gameId } = this.state;
    const { socket, endGame } = this.props;
    return <div>{React.cloneElement(games[gameId], { socket, endGame })}</div>;
  }
}
