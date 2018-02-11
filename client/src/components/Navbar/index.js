import React from 'react'

const style = {
  backgroundColor: 'white'
}

const renderLeft = (playerName, page) => {
  if (page === 'landing') {
    return <h2>Welcome</h2>
  }
  else {
    return <p>{playerName}</p>
  }
} 

const Navbar = ({playerName, page}) => {
  return (
    <nav style={style} className="navbar" aria-label="main navigation">
      <div className="navbar-brand">
        {renderLeft(playerName, page)}
      </div>
      <div className='navbar-item'>
        <h2>Hello</h2>
      </div>
    </nav>
  )
}

export default Navbar