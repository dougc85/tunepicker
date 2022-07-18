import React from 'react';
import styled from 'styled-components';
import Loading from '../../../Loading/Loading';

const LoadingContainerStyled = styled.div`
  display: inline-block;
  padding-left: 7px;
  transform: translateY(1px);

  ${props => {
    if (props.absolute) {
      return (`
        position: absolute;
        top: 7px;
      `)
    }
  }}

${props => {
    if (props.sets) {
      return (`
        left: 6.1rem;
      `)
    }
  }}
`

export default function LoadingContainer(props) {
  return (
    <LoadingContainerStyled absolute={(props.knowledge || props.sets) ? true : null} sets={props.sets}>
      <Loading size={1} spinnerOnly embedded />
    </LoadingContainerStyled>
  )
}