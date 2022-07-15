import React, { useState } from 'react';
import { LibraryEntryStyled } from './LibraryEntry.styled';

function LibraryEntry(props) {

  const { entryId, entryTitle, librarySetter } = props;

  const [selected, setSelected] = useState(false);

  function handleClick() {
    if (selected) {
      librarySetter((oldState) => {
        if (oldState.hasOwnProperty(entryId)) {
          const newState = { ...oldState };
          delete newState[entryId];

          return newState;
        }
      })
    } else if (!selected) {
      librarySetter((oldState) => {
        const newState = { ...oldState };
        newState[entryId] = null;
        return newState;
      })
    }
    setSelected((oldSelected) => !oldSelected);


  }

  return (
    <LibraryEntryStyled selected={selected} onClick={handleClick} >
      {entryTitle}
    </LibraryEntryStyled>
  )
}

export default LibraryEntry;