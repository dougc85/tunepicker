import { React } from 'react';
import { LoadingStyled, Spinner } from './Loading.styled';

function Loading(props) {

  const { spinnerOnly, size, embedded } = props;

  return (
    <LoadingStyled embedded={embedded}>
      <Spinner size={size}>
        <div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div>
      </Spinner>
      {!spinnerOnly ?
        <p>
          loading
        </p> : null
      }
    </LoadingStyled>
  )
}

export default Loading;