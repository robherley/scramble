import React, { Component } from 'react';
import SpaceSpam from './SpamSpacebar';
import TypeFaster from './TypeFaster';

const games = [<SpaceSpam />, <TypeFaster />];

export default ({ socket, endGame, gameId, randomNum }) =>
  React.cloneElement(games[1], { socket, endGame, randomNum});
