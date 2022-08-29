import React, { useState } from 'react';
import { QuickStartStyled, MetaStyles, StepOne } from './QuickStart.styled';
import Help from '../Help/Help';
import Header from '../Header/Header';
import QuickArrow from '../generics/QuickArrow.styled';
import QuickFrame from './QuickFrame/QuickFrame';

function QuickStart() {

  const [step, setStep] = useState(1);

  let nextStep;

  function quickForward() {
    console.log('moved forward!');
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
            Welcome to the <strong>quick start</strong>!
          </p>
          <p>
            Click the 'x' in the top-left to exit back to the <strong>help center</strong> at any time.
          </p>
          <p>
            Click the menu in the top right corner to get started!
          </p>
        </StepOne>
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