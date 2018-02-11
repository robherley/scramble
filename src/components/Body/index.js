import React from 'react'
import { Box } from 'reactbulma'

const style = {
  padding: `20px`,
}

const cardStyle = {
  height: `100%`
}

const Body = (props) => {
  return (
    <div className='body' style={style}>
      <Box style={cardStyle}>
          {props.children}
      </Box>
    </div>
  )
}

export default Body