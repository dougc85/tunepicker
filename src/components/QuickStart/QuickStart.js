import React, { useState } from 'react';
import { StepOne } from './QuickStart.styled';
import QuickArrow from '../generics/QuickArrow.styled';
import QuickFrame from './QuickFrame/QuickFrame';
import { navItems } from '../../data/navItems';
import Library from '../Library/Library';
import Sets from '../Library/Sets/Sets';

function QuickStart() {

  const [step, setStep] = useState(1);

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
      <QuickArrow rotation="90" height="200" bottom="-90" left="70" textObject={textObject} />
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
      text: "Bloop",
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