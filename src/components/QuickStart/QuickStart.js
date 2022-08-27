import React, { useState } from 'react';
import { QuickStartStyled, MetaStyles } from './QuickStart.styled';
import Help from '../Help/Help';
import { Link } from 'react-router-dom';
import Header from '../Header/Header';

function QuickStart() {

  const [step, setStep] = useState(1);

  let nextStep;

  if (step === 1) {
    nextStep = (
      <Help heading="Help Center" quick={step} />
    )
  }
  return (
    <MetaStyles>
      <Header quick={step}>
        <QuickStartStyled>
          <p>
            <Link to="/help">Click</Link> to exit Quick Start
          </p>
          {nextStep}
        </QuickStartStyled>
      </Header>
    </MetaStyles>
  )
}

export default QuickStart;