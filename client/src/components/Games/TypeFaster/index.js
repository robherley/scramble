import React, { Component } from 'react';
import challenge from '../../../assets/dictionary';
import EventListener from 'react-event-listener';
import Quote from './Quote';

export default class TypeFaster extends Component {
  constructor(props) {
    super(props);
    // change this later so server can choose the quote for both players
    this.state = {
      quote: '',
      meIndex: 0,
      oppIndex: 0
    };
  }

  specialKey(char) {
    const keyCodes = {
      ':': 59,
      ';': 59,
      '=': 61,
      '+': 61,
      ',': 188,
      '<': 188,
      '-': 173,
      _: 173,
      '.': 190,
      '>': 190,
      '/': 191,
      '?': 191,
      '`': 192,
      '~': 192,
      '[': 219,
      '{': 219,
      '\\': 220,
      '|': 220,
      ']': 221,
      '}': 221,
      "'": 222,
      '"': 222
    };
    return keyCodes[char];
  }

  componentDidMount() {
    this.setState({ quote: challenge[this.props.randomNum] });
  }

  isLower(str) {
    return str === str.toLowerCase();
  }

  onKeyPress(e) {
    e.preventDefault();
    const { meIndex, quote } = this.state;

    const inputChar = String.fromCharCode(e.keyCode);
    const currReqChar = quote.charAt(meIndex);

    console.log(`we need ${currReqChar}`);
    console.log(e.keyCode);
    console.log(inputChar);
    if (e.keyCode === 8 || e.keyCode === 222) {
      e.preventDefault();
    }

    if ((e.keyCode >= 65 && e.keyCode <= 90) || e.keyCode === 32) {
      switch (this.isLower(currReqChar)) {
        case true:
          if (inputChar === currReqChar.toUpperCase() && !e.shiftKey)
            this.setState({ meIndex: meIndex + 1 });
          this.props.socket.emit('score');
          break;
        default:
          if (inputChar === currReqChar.toUpperCase() && e.shiftKey)
            this.setState({ meIndex: meIndex + 1 });
          this.props.socket.emit('score');
      }
    } else {
      console.log('special char!');
      const reqKeyCode = this.specialKey(currReqChar);
      if (reqKeyCode === e.keyCode) {
        this.setState({ meIndex: meIndex + 1 });
        this.props.socket.emit('score');
      }
    }
    if (meIndex === quote.length - 1) this.props.endGame();
  }

  render() {
    const { meIndex, oppIndex, quote } = this.state;
    return (
      <div className="type-faster">
        <h1>TypeFaster!</h1>
        <h2>Type faster than your opponent!</h2>
        <Quote quote={quote} meIndex={meIndex} oppIndex={oppIndex} />
        <EventListener
          target="window"
          onKeyUp={e => {
            this.onKeyPress(e);
          }}
        />
      </div>
    );
  }
}
