import React from 'react';
import './FrontPage.scss'

function FrontPage(props) {
  return (
    <div className="FrontPage">
      {`Hello ${props.user}!`}
    </div>
  )
}

export default FrontPage