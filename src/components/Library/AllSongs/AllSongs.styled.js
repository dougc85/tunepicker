import styled from 'styled-components';

export const AllSongsStyled = styled.div`
  height: calc(100vh - 95px);
  display: flex;
  flex-direction: column;
`

export const AllSongsHeader = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;


  h2 {
    font-weight: bold;
    font-size: 2.5rem;
    margin-left: 1rem;
  }

  svg {
    height: 24px;
    margin-left: 1rem;
  }
`

export const SongsHeader = styled.div`
  margin-top: .7rem;
  margin-bottom: 1rem;
  display: flex;
  justify-content: flex-end;
`