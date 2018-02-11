import React, {Component} from 'react'

export default class Timer extends Component {
  constructor(props) {
    super(props)
    this.timer = 0
    this.state = {
      seconds: 60
    }
  }

  componentDidMount() {
    this.startTimer()
  }

  startTimer() {
    this.timer = setInterval(this.countDown.bind(this), 1000);
  }

  countDown() {
    let seconds = this.state.seconds - 1;
    this.setState({seconds: seconds});
    if (seconds === 0) clearInterval(this.timer);
  }

  render() {
    return (
      <h1>{this.state.seconds}s</h1>
    )
  }
}