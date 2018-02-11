import React from 'react';

const EndScreen = ({ won }) => {
  console.log(won);
  if (won === 'heck') {
    return (
      <div>
        <h1>You tied!!!</h1>
      </div>
    );
  }
  return (
    <div>
      <h1>You {won ? 'won!' : 'lost!'}</h1>
    </div>
  );
};

export default EndScreen;
