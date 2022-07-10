import React from 'react';
import { LibraryEntryStyled } from './LibraryEntry.styled';

function LibraryEntry(props) {

  const { entryType, entryId, entryTitle } = props;

  return (
    <LibraryEntryStyled>
      {entryTitle}
    </LibraryEntryStyled>
  )
}

export default LibraryEntry;