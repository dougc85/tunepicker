import { React } from 'react';
import { LoadingStyled, Spinner } from './Loading.styled';

function Loading(props) {

  const { spinnerOnly } = props;

  return (
    <LoadingStyled>
      <Spinner >
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