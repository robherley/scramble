import React, {Component} from 'react'
import challenge from '../../../assets/dictionary'
import EventListener from 'react-event-listener';
import Quote from './Quote'

export default class TypeFaster extends Component {
  constructor(props) {
    super(props)
    // change this later so server can choose the quote for both players
    this.state = {
      quote: '',
      meIndex: 0,
      oppIndex: 0
    }
  }

  componentDidMount() {
    this.setState({quote: challenge[Math.floor(Math.random() * challenge.length)].toLowerCase()})
  }

  isLower(str) {
    return str === str.toLowerCase()
  }

  onKeyPress(e) {
    console.log(e.keyCode)
    e.preventDefault()
    const {meIndex, quote} = this.state

    const inputChar = String.fromCharCode(e.keyCode)
    const currReqChar = quote.charAt(meIndex)
    console.log(`we need this letter: ${currReqChar}`)

    const isLower = this.isLower(currReqChar)
    switch(isLower) {
      case true:
        console.log(inputChar)
        if (inputChar === currReqChar.toUpperCase() && !e.shiftKey) {
          this.setState({meIndex: meIndex + 1})
          console.log('incrementing myIndex')
        }
        else console.log('nah1')
        break
      default:
        console.log(inputChar)
        if (inputChar === currReqChar.toUpperCase() && e.shiftKey) {
          this.setState({meIndex: meIndex + 1})
          console.log('incrementing myIndex')
        }
        else console.log('nah2')
    }
    if (meIndex == quote.length-1) {
      this.endGame()
    }
  }

  endGame() {
    //socket emits "end game" here
    console.log('end game!!')
  }

  render() {
    const {meIndex, oppIndex, quote} = this.state
    return (
      <div className='type-faster'>
        <h1>TypeFaster!</h1>
        <h2>Type faster than your opponent!</h2>
        <br />
        <Quote quote={quote} meIndex={meIndex} oppIndex={oppIndex} />
        <EventListener
          target="window"
          onKeyDown={e => {
            this.onKeyPress(e);
          }}
        />
      </div>
    )
  }
}