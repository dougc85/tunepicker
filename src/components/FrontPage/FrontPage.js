import React, { useContext } from 'react';
import SubContext from '../../context/sub-context';
import { FrontPageStyled } from './FrontPage.styled';
import Loading from '../Loading/Loading';

function FrontPage(props) {

  const context = useContext(SubContext);

  const email = context.user.email;
  const loading = context.loading;

  if (loading) {
    return (
      <Loading />
    )
  }
  return (
    <FrontPageStyled >
      {`Hello ${email}!`}
    </FrontPageStyled>
  )
}

export default FrontPage