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
      this.props.socket.emit('score');
      this.setState(
        { count: this.state.count + 1 },
        () =>
          (this.refs.countNum.style.fontSize = `${60 + 2 * this.state.count}px`)
      );
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
          <h1 ref="countNum" className="count">
            {this.state.count}
          </h1>
        </div>
      </div>
    );
  }
}
