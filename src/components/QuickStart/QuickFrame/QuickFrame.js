import React from 'react';
import { QuickFrameStyled, MetaStyles } from './QuickFrame.styled';
import { Link } from 'react-router-dom';
import Header from '../../Header/Header';

function QuickFrame(props) {

  const { children, step, navAccess, navMenuArrow, libraryArrow, quickForward, singleNavAllowed } = props;

  return (
    <MetaStyles>
      <Header
        quick={step}
        navAccess={navAccess}
        navMenuArrow={navMenuArrow}
        quickForward={quickForward}
        singleNavAllowed={singleNavAllowed}
        libraryArrow={libraryArrow}
      >
        <QuickFrameStyled>
          <Link to="/help">
            <svg viewBox="0 0 24 24">
              <path fill="currentColor" d="M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" />
            </svg>
          </Link>
          {children}
        </QuickFrameStyled>
      </Header>
    </MetaStyles>
  )
}

export default QuickFrame;