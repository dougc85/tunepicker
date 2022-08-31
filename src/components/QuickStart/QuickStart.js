import React, { useState } from 'react';
import { StepOne } from './QuickStart.styled';
import QuickArrow from '../generics/QuickArrow.styled';

import QuickFrame from './QuickFrame/QuickFrame';
import { navItems } from '../../data/navItems';
import Library from '../Library/Library';
import Sets from '../Library/Sets/Sets';
import Set from '../Library/Set/Set';

function QuickStart() {

  const [step, setStep] = useState(1);
  const [createdSetName, rememberSetName] = useState(undefined);
  const [createdSetId, rememberSetId] = useState(undefined);

  let nextStep;

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

  if (step === 4) {
    const textObject = {
      text: "Let's make a new set of songs to use on our next gig",
      bottom: '-80',
      left: '-60',
    }
    const arrow = (
      <QuickArrow rotation="125" height="150" top="0" left="-100" textObject={textObject} />
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
      top: '-160',
      left: '-60',
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
      <QuickArrow rotation="90" height="100" bottom="-70" left="0" center textObject={textObject} />
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
      <QuickArrow rotation={rotation} height={height} top={top} bottom={bottom} left={left} right={right} textObject={textObject} />
    )
    nextStep = (
      <Set
        menuArrow={arrow}
        quickForward={quickForward}
        quick={step}
        quickStartId={createdSetId}
      />
    )
  }

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
          will recommend you play it, so you get more practice.
          <button onClick={handleClick}>then click here</button>
        </>
      ),
      top: '-160',
      left: '-146',
      width: '300',
    }

    const arrow = (
      <QuickArrow rotation="-90" top="75" height="50" center textObject={textObject} />
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
      top: '90',
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
      />
    )
  }

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
      />
    )
  }

  return (
    <QuickFrame
      step={step}
      quickForward={quickForward}
      navAccess={false}
    >
      {nextStep}
    </QuickFrame>
  )
}

export default QuickStart;