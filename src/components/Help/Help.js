import React from 'react';
import { HelpStyled } from './Help.styled';
import { Link } from 'react-router-dom';

function Help(props) {

  const { heading } = props;

  return (
    <HelpStyled>
      <h2>{heading}</h2>
      <ul>
        <li>
          The tunePicker is an app that helps you pick tunes to play on your gigs or in your practice sessions.
        </li>
        <li>
          No charts, no play-along recordings, just you and your memory.  The Tunepicker encourages you to
          play tunes you just learned and tunes you learned a long time ago.
        </li>
        <li>
          Click 'Quick Start' for a fast intro to the app.  'Docs' will give you more in depth instructions.
        </li>
      </ul>

      <Link to='/help/quickstart'>Quick Start</Link>
      <Link to='/help/docs'>Docs</Link>
    </HelpStyled>
  )
}

export default Help;