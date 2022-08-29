import React, { useState } from 'react';
import { StepOne } from './QuickStart.styled';
import QuickArrow from '../generics/QuickArrow.styled';
import QuickFrame from './QuickFrame/QuickFrame';
import { navItems } from '../../data/navItems';

function QuickStart() {

  const [step, setStep] = useState(1);

  console.log(step, 'step');

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