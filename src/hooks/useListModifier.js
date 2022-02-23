import { useEffect, useState } from 'react';

function useListModifier(startingList, listName) {
  const [list, setList] = useState(startingList);

  // useEffect(() => {
  //   if (listName === "new") {
  //     window.localStorage.setItem('tuneStorageNew', JSON.stringify(list));
  //   } else if (listName === 'med') {
  //     window.localStorage.setItem('tuneStorageMed', JSON.stringify(list));
  //   } else {
  //     window.localStorage.setItem('tuneStorageKnow', JSON.stringify(list));
  //   }
  // }, [list, listName]);

  return [list, setList];
}

export default useListModifier;
