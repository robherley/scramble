import React, { Component } from 'react';

class EndScreen extends Component {
  componentWillUnmount() {
    this.props.socket.close();
  }

  render() {
    const { won } = this.props;
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
  }
}

export default EndScreen;
