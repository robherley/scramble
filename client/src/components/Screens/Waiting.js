import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { styler, everyFrame } from 'popmotion';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 75px;
  position: relative;
  align-self: flex-start;
  margin-bottom: 140px;
  margin-left: 15.5em;
  .ball {
    background: var(--purple);
    border-radius: 50%;
    margin-right: 15px;
    flex: 0 0 75px;

    &:nth-child(4n + 2) {
      background: var(--green);
    }

    &:nth-child(4n + 3) {
      background: var(--pink);
    }

    &:nth-child(4n + 4) {
      background: var(--blue);
    }
  }
`;

const Flex = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

class Waiting extends Component {
  componentDidMount() {
    const container = ReactDOM.findDOMNode(this.refs.balls);
    const ballStylers = Array.from(container.childNodes).map(styler);
    const distance = 100;

    everyFrame().start(timestamp =>
      ballStylers.forEach((thisStyler, i) => {
        thisStyler.set('y', distance * Math.sin(0.004 * timestamp + i * 0.5));
      })
    );
  }

  render() {
    return (
      <Flex>
        <Wrapper ref="balls">
          <div className="ball" />
          <div className="ball" />
          <div className="ball" />
          <div className="ball" />
        </Wrapper>
        <h1>Waiting for an opponent!</h1>
      </Flex>
    );
  }
}

export default Waiting;
