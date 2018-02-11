import React, { Component } from 'react';

class End extends Component {
  componentWillUnmount() {
    this.props.socket.close();
  }

  render() {
    const { won } = this.props;
    return (
      <div>
        {won === 'heck' ? (
          <h1>You tied!!!</h1>
        ) : won ? (
          <h1 style={{ color: 'var(--green)' }}>You won!</h1>
        ) : (
          <h1>You Lost!</h1>
        )}
        <br />
        <button onClick={() => window.location.reload()}>Play Again!</button>
      </div>
    );
  }
}

export default End;
