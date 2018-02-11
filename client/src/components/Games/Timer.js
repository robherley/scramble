import React, { Component } from 'react';
import ProgressBar from 'react-progress-bar-plus';

export default class Timer extends Component {
  constructor(props) {
    super(props);
    this.timer = 0;
    this.state = {
      seconds: 200
    };
  }

  componentDidMount() {
    this.startTimer();
  }

  startTimer() {
    this.timer = setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({ seconds: seconds });
    if (seconds === 0) {
      clearInterval(this.timer);
      console.log('ending game...');
      this.props.endGame();
    }
  }

  render() {
    return (
      <h1>
        <ProgressBar percent={(10 - this.state.seconds) / 10 * 100} />
        {this.state.seconds}s
      </h1>
    );
  }
}
