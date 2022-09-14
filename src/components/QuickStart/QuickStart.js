import React, { useState } from 'react';
import { StepOne } from './QuickStart.styled';
import QuickArrow from '../generics/QuickArrow.styled';

import QuickFrame from './QuickFrame/QuickFrame';
import { navItems } from '../../data/navItems';
import Library from '../Library/Library';
import Sets from '../Library/Sets/Sets';
import Set from '../Library/Set/Set';
import Song from '../Library/Song/Song';
import PickController from '../PickController/PickController';
import TunesIWantToLearn from '../TunesIWantToLearn/TunesIWantToLearn';

function QuickStart() {

  const [step, setStep] = useState(1);
  const [createdSetName, rememberSetName] = useState(undefined);
  const [createdSetId, rememberSetId] = useState(undefined);
  const [createdSongName, rememberCreatedSongName] = useState(undefined);
  const [secondSongId, rememberSecondSongId] = useState(undefined);
  const [deletedSongName, rememberDeletedSongName] = useState(undefined);

  let nextStep;

  function quickRewind() {
    setStep(old => old - 1);
  }

  function quickForward() {
    setStep(old => old + 1);
  }

  function navCssPosition(textCapitalized) {
    for (let i = 0; i < navItems.length; i++) {
      if (textCapitalized === navItems[i].text) {
        return i + 1;
      }
    }
  }

  function preventRefresh(e) {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    e.preventDefault();
  }

  if (step === 1) {

    const arrow = (
      <QuickArrow rotation="135" height="120" right="0" top="0" />
    )

    return (
      <QuickFrame
        step={step}
        navAccess={true}
        quickForward={quickForward}
        navMenuArrow={arrow}
      >
        <StepOne>
          <p>
            Welcome to the <strong>Quick Start</strong>!
          </p>
          <p>
            Click on the
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
            in the top-left to exit back to the <strong>Help Center</strong> at any time.
          </p>
          <p>
            Click the menu in the top right corner to get started!
          </p>
        </StepOne>
      </QuickFrame>
    )
  }

  if (step === 2) {

    const textObject = {
      text: "We'll start in our library",
      left: '-80',
    }
    const arrow = (
      <QuickArrow rotation="135" height="90" top="60" left="10" textObject={textObject} />
    )

    return (
      <QuickFrame
        step={step}
        quickForward={quickForward}
        navAccess={false}
        singleNavAllowed={navCssPosition('Library')}
        libraryArrow={arrow}
      >
        {nextStep}
      </QuickFrame>
    )
  }

  //Library
  if (step === 3) {
    const textObject = {
      text: "Most of the time, we'll be using the 'Sets' folder, so let's go there",
      bottom: '-100',
      left: '-20',
    }
    const arrow = (
      <QuickArrow rotation="90" height="200" bottom="-90" center textObject={textObject} />
    )

    nextStep = (
      <Library
        setsArrow={arrow}
        quickForward={quickForward}
      />
    )
  }

  //Sets
  if (step === 4) {
    const textObject = {
      text: "Let's make a new set of songs to use on our next gig",
      bottom: '-80',
      left: '-60',
    }
    const arrow = (
      <QuickArrow rotation="125" height="150" top="0" left="-100" lowerZ textObject={textObject} />
    )
    nextStep = (
      <Sets
        addArrow={arrow}
        quickForward={quickForward}
        quick={step}
      />
    )
  }

  if (step === 5) {
    const textObject = {
      text: "I use the app to play through jazz tunes, so I have a set called 'Jazz Standards'. Title your set something useful to you and click 'Add'.",
      top: '-120',
      left: '-110',
      width: '280',
    }
    const arrow = (
      <QuickArrow rotation="-90" height="100" top="-90" left="0" center textObject={textObject} />
    )
    nextStep = (
      <Sets
        titleArrow={arrow}
        quickForward={quickForward}
        quick={step}
        rememberSetName={rememberSetName}
      />
    )
  }

  if (step === 6) {
    const textObject = {
      text: "Now let's click on the set we just created",
      top: '100',
      left: '-60',
    }
    const arrow = (
      <QuickArrow rotation="90" height="100" bottom="-70" left="0" center lowerZ textObject={textObject} />
    )
    nextStep = (
      <Sets
        setArrow={arrow}
        quickForward={quickForward}
        quick={step}
        createdSetName={createdSetName}
        rememberSetId={rememberSetId}
      />
    )
  }

  //Set
  if (step === 7) {
    const text = "We need to add some songs, so let's open up this set's menu";
    const textObject = (createdSetName.length < 9) ? {
      text,
      top: '80',
      left: '-25',
    } : (createdSetName.length < 15) ? {
      text,
      top: '80',
      left: '-95',
    } :
      {
        text,
        top: '95',
        left: '-130',
      };

    const top = (createdSetName.length < 9) ? "10" : (createdSetName.length < 15) ? "10" : "5";
    const bottom = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";
    const left = (createdSetName.length < 9) ? "-13" : (createdSetName.length < 15) ? "-35" : "-70";
    const right = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";

    const rotation = (createdSetName.length < 9) ? "65" : (createdSetName.length < 15) ? "100" : "120";

    const height = createdSetName.length < 15 ? "80" : "110";

    const arrow = (
      <QuickArrow rotation={rotation} height={height} top={top} bottom={bottom} left={left} right={right} textObject={textObject} lowerZ />
    )
    nextStep = (
      <Set
        menuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        libMenuForward={true}
      />
    )
  }

  //Add Song
  if (step === 8) {

    const textObject = {
      text: "Add a song",
      top: '130',
      left: '5',
    }

    const arrow = (
      <QuickArrow rotation="90" top="0" center textObject={textObject} />
    )

    nextStep = (
      <Set
        addSongArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        disableLibMenuScreen={true}
      />
    )
  }

  if (step === 9) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          Enter the title of a song you know
          <button onClick={handleClick}>Then click here</button>
        </>
      ),
      top: '130',
      left: '-40',
    }

    const arrow = (
      <QuickArrow rotation="90" top="0" center textObject={textObject} />
    )

    nextStep = (
      <Set
        songTitleArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

  if (step === 10) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          Set the key here.  If you leave it set to 'random', tunePicker will
          encourage you to play the song in randomly selected keys.
          <button onClick={handleClick}>got it</button>
        </>
      ),
      top: '130',
      left: '-65',
      width: '220',
    }

    const arrow = (
      <QuickArrow rotation="90" top="1" center textObject={textObject} />
    )

    nextStep = (
      <Set
        keyArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

  if (step === 11) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          Set how well you know this tune. The newer the tune is, the more frequently tunePicker
          will recommend you play it, so that you get more practice.
          <button onClick={handleClick}>then click here</button>
        </>
      ),
      top: '30',
      left: '-146',
      width: '300',
    }

    const arrow = (
      <QuickArrow rotation="90" top="45" height="50" center textObject={textObject} />
    )

    nextStep = (
      <Set
        knowledgeArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

  if (step === 12) {

    const textObject = {
      text: (
        <>
          Now, click here to add the song to this set and to your library
        </>
      ),
      top: '-70',
      left: '-115',
    }

    const arrow = (
      <QuickArrow rotation="-90" top="-60" center height="80" textObject={textObject} />
    )

    nextStep = (
      <Set
        addButtonArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        rememberCreatedSongName={rememberCreatedSongName}
      />
    )
  }

  if (step === 13) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          Great! We have our first song. Songs are color-coded to be <span>green</span> if
          you know the song well, <span>yellow</span> if you know the song medium
          well, or <span>orange</span> if you've only recently learned the tune.
          <button onClick={handleClick}>got it</button>
        </>
      ),
      top: '60',
      left: '-175',
      width: '300',
    }

    const arrow = (
      <QuickArrow rotation="90" top="20" center height="0" textObject={textObject} color="true" />
    )

    nextStep = (
      <Set
        tuneArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        disableLibMenu={true}
      />
    )
  }

  //Add Multiple Songs
  if (step === 14) {
    const text = "Now that we've learned how to add one song, let's learn how to add several at once. Start by reopening this set's menu.";
    const textObject = (createdSetName.length < 9) ? {
      text,
      top: '80',
      left: '-25',
    } : (createdSetName.length < 15) ? {
      text,
      top: '80',
      left: '-95',
    } :
      {
        text,
        top: '95',
        left: '-130',
      };

    const top = (createdSetName.length < 9) ? "10" : (createdSetName.length < 15) ? "10" : "5";
    const bottom = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";
    const left = (createdSetName.length < 9) ? "-13" : (createdSetName.length < 15) ? "-35" : "-70";
    const right = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";

    const rotation = (createdSetName.length < 9) ? "65" : (createdSetName.length < 15) ? "100" : "120";

    const height = createdSetName.length < 15 ? "80" : "110";

    const arrow = (
      <QuickArrow rotation={rotation} height={height} top={top} bottom={bottom} left={left} right={right} textObject={textObject} />
    )
    nextStep = (
      <Set
        menuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        libMenuForward={true}
      />
    )
  }

  if (step === 15) {
    const textObject = {
      text: "Click here to add multiple songs at once",
      top: '130',
      left: '-43',
    }

    const arrow = (
      <QuickArrow rotation="90" top="0" center textObject={textObject} />
    )

    nextStep = (
      <Set
        addMultipleArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        disableLibMenuScreen={true}
      />
    )
  }

  if (step === 16) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          Type three songs, each one on a different line
          <button onClick={handleClick}>Then click here</button>
        </>
      ),
      top: '10',
      left: '-168',
      width: "330",
    }

    const arrow = (
      <QuickArrow rotation="90" top="-70" height="40" center textObject={textObject} />
    )

    nextStep = (
      <Set
        songsEntryArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

  if (step === 17) {

    const textObject = {
      text: (
        <>
          Now click here to add these songs
        </>
      ),
      top: '-85',
      left: '-78',
    }

    const arrow = (
      <QuickArrow rotation="-90" top="-76" height="90" center textObject={textObject} />
    )

    nextStep = (
      <Set
        addMultipleButtonArrow={arrow}
        quickRewind={quickRewind}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

  if (step === 18) {

    const textObject = {
      text: (
        <>
          Notice how the songs we just added are all <span>green</span>.  When you add songs in bulk,
          tunePicker defaults to assuming you know the songs well.
          Let's say we don't know this particular song well. Click to edit it.
        </>
      ),
      top: '135',
      left: '-82',
      width: '280',
    }

    const arrow = (
      <QuickArrow rotation="90" top="5" center height="160" textObject={textObject} color="true" />
    )

    nextStep = (
      <Set
        secondTuneArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        createdSongName={createdSongName}
        rememberSecondSongId={rememberSecondSongId}
        disableLibMenu={true}
      />
    )
  }

  //Edit Song
  if (step === 19) {

    const textObject = {
      text: (
        <>
          Here on the song's page, you can change anything about it.  For practice, we'll change how well we know
          the song. Click here.
        </>
      ),
      top: '105',
      left: '-190',
      width: '280',
    }

    const arrow = (
      <QuickArrow rotation="145" top="-25" left="-105" height="130" textObject={textObject} />
    )

    nextStep = (
      <Song
        quickSongId={secondSongId}
        knowledgeEditArrow={arrow}
        quickForward={quickForward}
        quick={step}
      />
    )
  }

  if (step === 20) {

    const textObject = {
      text: (
        <>
          Now change how well you know this tune.  Set it, either, to 'Medium well' or 'Just learned', then
          click 'confirm'.
        </>
      ),
      top: '110',
      left: '-98',
      width: '280',
    }

    const arrow = (
      <QuickArrow rotation="90" center top="40" height="130" textObject={textObject} />
    )

    nextStep = (
      <Song
        quickSongId={secondSongId}
        confirmArrow={arrow}
        quickForward={quickForward}
        quick={step}
      />
    )
  }

  if (step === 21) {

    const textObject = {
      text: (
        <>
          Great job! We're done with this song, so let's go back to our set.
          <span>
            You can use this navigation bar
            here in the upper left corner of the screen to move around your library.  Click the 'set' icon here.
          </span>
        </>
      ),
      top: '50',
      left: '-38',
      width: '280',
    }

    const arrow = (
      <QuickArrow rotation="75" top="10" left="-10" height="60" newline lowerZ textObject={textObject} />
    )

    nextStep = (
      <Song
        quickSongId={secondSongId}
        quickForward={quickForward}
        quick={step}
        pathArrow={arrow}
      />
    )
  }

  //Back in Set
  if (step === 22) {
    const text = "Okay, we're back in our set. Now that we've added a few songs, we're ready to use it on a gig. Open up the set's menu one last time.";
    const textObject = (createdSetName.length < 9) ? {
      text,
      top: '80',
      left: '-25',
    } : (createdSetName.length < 15) ? {
      text,
      top: '80',
      left: '-95',
    } :
      {
        text,
        top: '95',
        left: '-130',
      };

    const top = (createdSetName.length < 9) ? "10" : (createdSetName.length < 15) ? "10" : "5";
    const bottom = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";
    const left = (createdSetName.length < 9) ? "-13" : (createdSetName.length < 15) ? "-35" : "-70";
    const right = (createdSetName.length < 9) ? "auto" : (createdSetName.length < 15) ? "0" : "0";

    const rotation = (createdSetName.length < 9) ? "65" : (createdSetName.length < 15) ? "100" : "120";

    const height = createdSetName.length < 15 ? "80" : "110";

    const arrow = (
      <QuickArrow rotation={rotation} height={height} top={top} bottom={bottom} left={left} right={right} textObject={textObject} />
    )
    nextStep = (
      <Set
        menuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        libMenuForward={true}
      />
    )
  }

  if (step === 23) {
    const textObject = {
      text: (
        <>
          Click here to tell the tunePicker that this set we've just created is the set
          we want to use on our next gig
        </>
      ),
      top: '130',
      left: '-28',
      width: '240',
    }

    const arrow = (
      <QuickArrow rotation="90" top="0" center textObject={textObject} />
    )

    nextStep = (
      <Set
        setAsPickerArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
        disableLibMenuScreen={true}
      />
    )
  }

  if (step === 24) {

    const textObject = {
      text: (
        <>
          Now we'll open up the tunePicker itself.  Click on the main menu up here.
        </>
      ),
      top: '95',
      left: '-108',
      width: '150',
    }

    const arrow = (
      <QuickArrow rotation="135" height="120" right="0" top="0" textObject={textObject} />
    )

    return (
      <QuickFrame
        step={step}
        navAccess={true}
        quickForward={quickForward}
        navMenuArrow={arrow}
      >
        <Set
          quickForward={quickForward}
          quick={step}
          quickStartId={createdSetId}
          disableLibMenu={true}
          navMenuArrow={arrow}
        />
      </QuickFrame>
    )
  }

  if (step === 25) {

    const textObject = {
      text: "Navigate to the Picker",
      left: '-80',
    }
    const arrow = (
      <QuickArrow rotation="135" height="90" top="20" left="10" textObject={textObject} />
    )

    return (
      <QuickFrame
        step={step}
        quickForward={quickForward}
        navAccess={false}
        singleNavAllowed={navCssPosition('Picker')}
        pickerArrow={arrow}
      >
        <Set
          setAsPickerArrow={arrow}
          quickForward={quickForward}
          quick={step}
          quickStartId={createdSetId}
        />
      </QuickFrame>
    )
  }

  //Picker
  if (step === 26) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          We've arrived at the tunePicker itself! The picker will give you the name of a tune to play (see above)
          and a key to play it in (also see above).
          <button onClick={handleClick}>Got it</button>
        </>
      ),
      top: '70',
      left: '-159',
      width: '270',
    }
    const arrow = (
      <QuickArrow rotation="135" height="0" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 27) {
    const textObject = {
      text: (
        <>
          Whenever you fire up the tunePicker, you'll want to tell it that you're starting a new gig; let's do that now.
          Open up the picker menu up here.
        </>
      ),
      top: '75',
      left: '-158',
    }
    const arrow = (
      <QuickArrow rotation="135" height="90" left="-65" top="-4" lowerZ textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerMenuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        libMenuForward={true}
      >
      </PickController>
    )
  }

  if (step === 28) {
    const textObject = {
      text: "Now, click here",
      top: '85',
      left: '-100',
    }
    const arrow = (
      <QuickArrow rotation="115" height="100" top="5" left="30" textObject={textObject} />
    )

    nextStep = (
      <PickController
        newGigArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenuScreen={true}
      >
      </PickController>
    )
  }

  if (step === 29) {
    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }
    const textObject = {
      text: (
        <>
          Alright, we've started our gig. The tunePicker has recommended a tune and a key to play it in.
          <button onClick={handleClick} >Nice!</button>
        </>
      ),
      top: '70',
      left: '-159',
      width: '270',
    }
    const arrow = (
      <QuickArrow rotation="115" height="0" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  //Skip
  if (step === 30) {
    const textObject = {
      text: (
        <>
          Let's say we don't want to play this tune right now. We can press the 'SKIP' button
          and the picker will pick a different tune and then try recommending this tune again later.
          <span>
            (There's even a small chance it'll pick it again immediately. If this happens, you'd
            just click skip again.)
          </span>
        </>
      ),
      top: '-160',
      left: '-61',
      width: '320',
    }
    const arrow = (
      <QuickArrow rotation="-75" height="120" top="-100" left="-10" newline textObject={textObject} />
    )

    nextStep = (
      <PickController
        skipArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  //Next Button in Picker
  if (step === 31) {
    const textObject = {
      text: (
        <>
          Alright, here's a tune we're in the mood to play.  We play it, the audience applauds, etc, etc.  Then, we click
          'NEXT' to go to a new tune
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 32) {
    const textObject = {
      text: (
        <>
          Here's another tune; we'll play this one, too, and then hit 'NEXT' again
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 33) {
    const textObject = {
      text: (
        <>
          Let's play another and hit 'NEXT' again.
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 34) {
    const textObject = {
      text: (
        <>
          And again...
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 35) {
    const textObject = {
      text: (
        <>
          And once more...
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 36) {
    const textObject = {
      text: (
        <>
          At this point, you may be noticing something strange. Click 'NEXT' again.
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  //Explain Picker Functionality
  if (step === 37) {
    const textObject = {
      text: (
        <>
          Notice how the orange (just learned) and/or yellow (medium) tunes have dissapeared? Click 'NEXT' again.
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 38) {
    const textObject = {
      text: (
        <>
          And some of the green ones (tunes I know well) are repeating themselves? Click 'NEXT' again.
        </>
      ),
      top: '40',
      left: '-138',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="55" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        nextArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 39) {
    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }
    const textObject = {
      text: (
        <>
          Well, the yellow and orange tunes aren't showing up because the picker assumes we're still at the same gig.
          You've already played those songs! So, it won't show them again.
          <button onClick={handleClick} >Nice!</button>
        </>
      ),
      top: '70',
      left: '-159',
      width: '270',
    }
    const arrow = (
      <QuickArrow rotation="115" height="0" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 40) {
    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }
    const textObject = {
      text: (
        <>
          As for the green songs, the tunePicker assumes you have a lot of songs you know well, and you might not finish
          them all within one gig.  So, when you've picked your last green song, the tunePicker reloads
          ALL the green songs and starts picking from them again.
          <button onClick={handleClick} >I see!</button>
        </>
      ),
      top: '60',
      left: '-165',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="115" height="0" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 41) {
    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }
    const textObject = {
      text: (
        <>
          Admittedly, this can create some strange behavior when you only have 4 songs in your set.  But, when you have, say,
          100 songs, it will ensure that you always play through all your old songs from time to time. i.e., the tunePicker REMEMBERS
          what green songs you've already played from gig to gig.
          <button onClick={handleClick} >Incredible!</button>
        </>
      ),
      top: '40',
      left: '-171',
      width: '300',
    }
    const arrow = (
      <QuickArrow rotation="115" height="0" center textObject={textObject} />
    )
    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 42) {
    const textObject = {
      text: (
        <>
          So, how do we get it to show the songs we learned more recently?
          <span>
            Well, click on the picker Menu again.
          </span>
        </>
      ),
      top: '115',
      left: '-128',
    }
    const arrow = (
      <QuickArrow rotation="135" height="140" right="-10" top="-10" textObject={textObject} />
    )

    nextStep = (
      <PickController
        pickerMenuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        libMenuForward={true}
      >
      </PickController>
    )
  }

  if (step === 43) {
    const textObject = {
      text: (
        <>
          This is why we always tell the picker when we're starting a new gig. The picker then knows to reload the
          'just learned' and 'medium' songs.
          <span>
            Click 'Start New Gig' now
          </span>

        </>
      ),
      top: '85',
      left: '-150',
      width: '230',
    }
    const arrow = (
      <QuickArrow rotation="115" height="100" top="5" left="30" newline textObject={textObject} />
    )

    nextStep = (
      <PickController
        newGigArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenuScreen={true}
      >
      </PickController>
    )
  }

  if (step === 44) {
    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }
    const textObject = {
      text: (
        <>
          Voila! Now that we're starting a new gig, the tunePicker is once again suggesting we play
          the orange (just learned) and yellow (know medium well) songs.
          <button onClick={handleClick} >I see</button>
        </>
      ),
      top: '40',
      left: '-171',
      width: '300',
    }
    const arrow = (
      <QuickArrow rotation="115" height="0" center textObject={textObject} />
    )
    nextStep = (
      <PickController
        pickerTextbox={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  //Up/Down Arrow Buttons
  if (step === 45) {
    const textObject = {
      text: (
        <>
          Finally, these arrows buttons allow you to change
          the setting of how well you know the displayed tune. Try clicking the up arrow now
          until the background turns green (indicating that you know the song really well).
        </>
      ),
      top: '-190',
      left: '-78',
      width: '230',
    }
    const arrow = (
      <QuickArrow rotation="-90" height="160" top="-145" center textObject={textObject} />
    )

    nextStep = (
      <PickController
        upArrow={arrow}
        quickForward={quickForward}
        quick={step}
        disableLibMenu={true}
      >
      </PickController>
    )
  }

  if (step === 46) {
    const textObject = {
      text: (
        <>
          Good, now let's imagine the tunePicker suggested this song that you used to know
          but you've now totally forgotten it.  We don't want it in the set anymore,
          but we also want to have a reminder somewhere that we should work on this tune.
          <span>
            Click the down arrow all the way to orange, and then click it one more time
          </span>
        </>
      ),
      top: '-245',
      left: '-168',
      width: '270',
    }
    const arrow = (
      <QuickArrow rotation="-90" height="160" top="-145" center newline textObject={textObject} />
    )

    nextStep = (
      <PickController
        downArrow={arrow}
        quickForward={quickForward}
        quick={step}
        rememberDeletedSongName={rememberDeletedSongName}
      >
      </PickController>
    )
  }

  if (step === 47) {
    const textObject = {
      text: (
        <>
          Read the box above, and click the 'Move Out and Erase From Library' button.

          <span>
            Then, we'll see where our
            forgotten song goes after we've removed it from our library.
          </span>
        </>
      ),
      top: '40',
      left: '-152',
      width: 320
    }
    const arrow = (
      <QuickArrow rotation="90" height="60" top="12" center newline textObject={textObject} />
    )

    nextStep = (
      <PickController
        moveOutArrow={arrow}
        quickForward={quickForward}
        quick={step}
      >
      </PickController>
    )
  }

  if (step === 48) {

    const textObject = {
      text: (
        <>
          Alright, the song's been deleted.  Now open up the menu up here again.
        </>
      ),
      top: '95',
      left: '-108',
      width: '150',
    }

    const arrow = (
      <QuickArrow rotation="135" height="120" right="0" top="0" textObject={textObject} />
    )

    return (
      <QuickFrame
        step={step}
        navAccess={true}
        quickForward={quickForward}
        navMenuArrow={arrow}
      >
        <PickController
          setAsPickerArrow={arrow}
          quickForward={quickForward}
          quick={step}
          quickStartId={createdSetId}
          disableLibMenu={true}
        />
      </QuickFrame>
    )
  }

  if (step === 49) {

    const textObject = {
      text: "We'll visit this list, which collects songs we want to learn",
      left: '-90',
      top: '80',
      width: '230',
    }
    const arrow = (
      <QuickArrow rotation="135" height="90" top="105" left="-15" textObject={textObject} />
    )

    return (
      <QuickFrame
        step={step}
        quickForward={quickForward}
        navAccess={false}
        singleNavAllowed={navCssPosition('Tunes To Learn')}
        tunesToLearnArrow={arrow}
      >
        <PickController
          setAsPickerArrow={arrow}
          quickForward={quickForward}
          quick={step}
          quickStartId={createdSetId}
          disableLibMenu={true}
        />
      </QuickFrame>
    )
  }

  //Tunes to Learn
  if (step === 50) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          And here it is, the song we just deleted.
          <span>
            This 'Tunes I Want To Learn' page is here for you to quickly jot down tunes you want to learn.
            Except for what we just did (knocking a tune out of a set), it doesn't
            interact with your library at all.  It's just a simple list.
          </span>
          <button onClick={handleClick}>
            got it
          </button>
        </>
      ),
      top: '90',
      left: '-118',
      width: '290',
    }
    const arrow = (
      <QuickArrow rotation="90" height="100" top="10" center newline textObject={textObject} />
    )

    nextStep = (
      <TunesIWantToLearn
        deletedSongArrow={arrow}
        quick={step}
        quickSong={deletedSongName}
        disableLibMenu={true}
      />
    )
  }

  if (step === 51) {

    function handleClick(e) {
      preventRefresh(e);
      quickForward();
    }

    const textObject = {
      text: (
        <>
          You can add tunes here, singly or in multiples.  And you can delete songs by
          clicking the trash icon.
          <button onClick={handleClick}>
            fascinating
          </button>
        </>
      ),
      top: '0',
      left: '-148',
      width: '250',
    }
    const arrow = (
      <QuickArrow rotation="90" height="0" top="-100" center newline textObject={textObject} />
    )

    nextStep = (
      <TunesIWantToLearn
        deletedSongArrow={arrow}
        quick={step}
        quickSong={deletedSongName}
        disableLibMenu={true}
      />
    )
  }
  if (step === 52) {

    const textObject = {
      text: (
        <>
          And that's it! You've finished the Quick Start!
          <span>
            If you want greater detail about the app, you can visit the 'More Info' section in the help center.
          </span>
          <span>
            Now, click on the 'x' in the top left corner to close out of the Quick Start.  Thanks for your time!
          </span>
        </>
      ),
      top: '0',
      left: '-148',
      width: '250',
    }
    const arrow = (
      <QuickArrow rotation="90" height="0" top="-110" center newline textObject={textObject} />
    )

    nextStep = (
      <TunesIWantToLearn
        deletedSongArrow={arrow}
        quick={step}
        quickSong={deletedSongName}
        disableLibMenu={true}
      />
    )
  }

  return (
    <QuickFrame
      step={step}
      navAccess={false}
    >
      {nextStep}
    </QuickFrame>
  )
}

export default QuickStart;