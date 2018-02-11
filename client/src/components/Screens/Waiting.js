import React, { Component } from 'react';
import styled from 'styled-components';
import { styler, everyFrame } from 'popmotion';

const Wrapper = styled.div`
  display: flex;
  align-items: stretch;
  height: 75px;
  position: relative;
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

class Waiting extends Component {
  componentDidMount() {
    const container = this.refs.balls.props.children;

    const ballStylers = Array.from(container).map(styler);
    console.log(this.refs.balls);
    const distance = 100;

    everyFrame().start(timestamp =>
      ballStylers.map((thisStyler, i) => {
        thisStyler.set('y', distance * Math.sin(0.004 * timestamp + i * 0.5));
      })
    );
  }

  render() {
    return (
      <div>
        <h1>Waiting for an opponent!</h1>
        <Wrapper ref="balls">
          <div className="ball" />
          <div className="ball" />
          <div className="ball" />
          <div className="ball" />
        </Wrapper>
      </div>
    );
  }
}

export default Waiting;
