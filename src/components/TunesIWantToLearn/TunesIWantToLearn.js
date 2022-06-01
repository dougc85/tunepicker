import React, { useContext } from 'react';
import SubContext from '../../context/sub-context';
import { TunesIWantToLearnStyled, Header } from "./TunesIWantToLearn.styled";
import LibraryMenu from '../generics/LibraryMenu.styled';
import Loading from '../Loading/Loading';

function TunesIWantToLearn() {

  const { user, userDoc, loading } = useContext(SubContext);

  function handleAddButton() {

  }

  function handleAddMultipleButton() {

  }

  const libraryMenuItems = [
    { text: 'Add Song To List', func: handleAddButton },
    { text: 'Add Multiple Songs To List', func: handleAddMultipleButton },
  ]

  if (loading) {
    return (
      <Loading />
    )
  }

  return (
    <>
      <TunesIWantToLearnStyled>
        <Header>
          <h2>{"Tunes I Want To Learn"}</h2>
          <LibraryMenu
            items={libraryMenuItems}
          />
        </Header>
      </TunesIWantToLearnStyled>
    </>
  )
}

export default TunesIWantToLearn;