import React from 'react';
import { DocsStyled } from "./Docs.styled";

function Help(props) {

  return (
    <DocsStyled>
      <h2>Docs</h2>
      <p>The tunePicker is an app that helps you pick tunes to play on your gigs.
        More importantly, though, it's a tool that helps you learn tunes better by making
        sure you play all the tunes you've learned but never think to call (so you don't forget them),
        and suggesting tunes to you more frequently if you've learned them recently (so they get into
        your memory better).

        <span>
          The menu in the top right-hand corner of the screen will lead you to the various parts of the app.
          Here's a quick intro to each page:
        </span>
      </p>
      <h3>Library</h3>
      <p>
        In the library, you create sets of songs. These sets can then be used later in the tunePicker. You'll
        load a set into the Picker, and then the app will pick tunes for you for your gig.  You can add songs to your sets
        one at a time, or many at once. To do any of this, navigate to a set and click the
        <svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
        </svg>
        button to see the menu of options. Most of the library is self-explanatory. A couple exceptions:
      </p>
      <ul>
        <li>
          <strong>All Songs</strong> is where all of your songs are stored, regardless of what set they're in. Sometimes, a song will still be in your
          library, but won't be in any set (because you removed it from a set, probably).  In this case, it can be found in All Songs.
        </li>
        <li>
          When setting a song's <strong>key</strong>, you can choose, either, 'random' or any one of the 12 keys. If you choose 'random', the tunePicker will suggest a random key
          whenever it picks that tune, so you can practice playing the tune in different keys.  If you choose a specific key, the tunePicker will only ever show
          that key. For me, I usually set standards to 'random' and difficult jazz melodies like 'Inner Urge' or 'Lennie's Pennies' to their appropriate key.
        </li>
        <li>
          When setting how well you <strong>know</strong> a tune, you can choose from 'new', 'medium', or 'know', from least to most settled in your memory.  If you know the tune
          less well, the tunePicker will suggest you play it more frequently, if you really know the tune well, it will suggest it less often. To get into specifics, it will pick
          tunes from the 'new' list four times as often as tunes from the 'know' list.  Also, the 'new' and 'medium' lists will refresh every time you start a new session with the
          tunePicker (i.e., when you start a new gig) so you will get those tunes suggested to you at almost every gig, whereas the 'know' list will remember the tunes you haven't
          played recently and won't pick them until you've gone through every tune on that list. The app works best when it's used as designed, that is, if you have a LOT of tunes
          on your 'know' list and much fewer, recently learned, tunes on your 'new' and 'medium' lists.
        </li>
      </ul>
      <h3>Picker</h3>
      <p>
        This is where all the action happens. The Picker picks songs from a specific set from your library.  It suggests tunes, one at a time, for you to play on your gig (or practice
        session). The Picker will tell you what set it's picking from at the top of the screen.  Also at the top is a menu
        (<svg viewBox="0 0 24 24">
          <path fill="currentColor" d="M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4M12,10.5A1.5,1.5 0 0,1 13.5,12A1.5,1.5 0 0,1 12,13.5A1.5,1.5 0 0,1 10.5,12A1.5,1.5 0 0,1 12,10.5M7.5,10.5A1.5,1.5 0 0,1 9,12A1.5,1.5 0 0,1 7.5,13.5A1.5,1.5 0 0,1 6,12A1.5,1.5 0 0,1 7.5,10.5M16.5,10.5A1.5,1.5 0 0,1 18,12A1.5,1.5 0 0,1 16.5,13.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 16.5,10.5Z" />
        </svg>)
        for Picker-related actions.
      </p>
      <ul>
        <li>
          The <strong>Next</strong> button will move you to the next song and will also make sure the current song doesn't get picked again.
        </li>
        <li>
          The <strong>Skip</strong> button is similar in that
          it moves you to a different song, but it will not remove the current song from the Picker.  Click this to tell the Picker "I'll come back to this song later".
        </li>
        <li>
          The <strong>&#8593;</strong> and <strong>&#8595;</strong> buttons will change how well you know the currently showing song.
          Click <strong>&#8593;</strong> to indicate that you know the song better than you used to (and you want it to show up less frequently).
          Click <strong>&#8595;</strong> to indicate that you forgot the song
          a bit, and want it to show up more so you can practice it more.  You can even click <strong>&#8595;</strong> enough times that you will be given the option of removing the
          song from your library and placing it in your "Tunes I Want to Learn" list (i.e., you forgot it, need to relearn it, and for now don't want it showing up in the picker).
        </li>
      </ul>
      <p>
        <strong>**</strong>A note about the picker: sometimes it will act a little wonky if you don't have enough tunes in the set you're loading from. The picker sort of assumes
        you have a lot of tunes that you 'know' really well, so it will refresh the 'know' list once you've played every tune on it.  If you don't have many tunes marked that you
        know them well, the picker might keep selecting those tunes over and over.
      </p>
      <h3>Tunes To Learn</h3>
      <p>
        This is just a list of tunes you would like to learn. You can manually add and delete tunes from this list whenever you want.
      </p>
    </DocsStyled>
  )
}

export default Help;