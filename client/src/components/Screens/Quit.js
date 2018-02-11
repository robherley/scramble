import React from 'react';

const Quit = () => (
  <div>
    <h1>Your Opponent Left The Game!</h1>
    <button onClick={() => window.location.reload()}>Play Again!</button>
  </div>
);

export default Quit;
