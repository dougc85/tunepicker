import styled from 'styled-components';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundStyled = styled.div`

`;

function NotFound() {

  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => {
      navigate('/library');
    }, 2000)
  }, []);

  return (
    <NotFoundStyled>
      <p>Library element not found.  Redirecting to Library.</p>
    </NotFoundStyled>
  )
}

export default NotFound;