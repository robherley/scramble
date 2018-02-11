import React, { Component } from 'react';
import EventListener from 'react-event-listener';

export default class Counter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0
    };
  }

  spaceDown(e) {
    if (e.keyCode === 32) {
      this.props.socket.emit('count');
      this.setState({ count: this.state.count + 1 });
    }
  }

  render() {
    return (
      <div className="spam-space">
        <h1>Spam your Spacebar!!</h1>
        <div className="space-counter">
          <EventListener
            target="window"
            onKeyUp={e => {
              this.spaceDown(e);
            }}
          />
          <h1>{this.state.count}</h1>
        </div>
      </div>
    );
  }
}
