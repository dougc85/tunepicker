import React, { useContext, useEffect } from 'react';
import { EmailAuthStyled } from './EmailAuth.styled';
import SubContext from '../../context/sub-context';
import { useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';

function EmailAuth() {

  const { user, tokenVerified } = useContext(SubContext);
  const navigate = useNavigate();

  useEffect(() => {

    async function refreshToken() {
      await user.getIdToken(true);
      window.location.reload();
    }

    if (user && !tokenVerified) {
      refreshToken();
    } else if (user && tokenVerified) {
      navigate('/');
    }
  }, [user, tokenVerified, navigate]);

  return (
    <EmailAuthStyled>
      <Loading />
    </EmailAuthStyled>
  )
}

export default EmailAuth;