import { useReducer } from 'react';

const songsReducer = (state, action) => {
  if (action.sortMethod === "Title - Ascending") {

    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {
      return a.title.localeCompare(b.title, undefined, { numeric: true });
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
  if (action.sortMethod === "Title - Descending") {
    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {
      return b.title.localeCompare(a.title, undefined, { numeric: true });
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
  if (action.sortMethod === "Date Created - Old To New") {
    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {

      return a.createdAt - b.createdAt;
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
  if (action.sortMethod === "Date Created - New To Old") {
    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {

      return b.createdAt - a.createdAt;
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
  if (action.sortMethod === "Knowledge") {
    const oldSongObject = { ...action.payload };
    const oldSongArrayOfObjects = Object.keys(oldSongObject).map((songId) => oldSongObject[songId]);
    const newSongArray = oldSongArrayOfObjects.sort((a, b) => {

      if (a.knowledge !== b.knowledge) {
        if (b.knowledge === 'know') {
          return -1;
        }
        if (b.knowledge === 'new') {
          return 1;
        }
        // b is medium
        if (a.knowledge === 'new') {
          return -1;
        }
        if (a.knowledge === 'know') {
          return 1;
        }
      } else {
        return a.title.localeCompare(b.title, undefined, { numeric: true });
      }
    })

    return {
      songsArray: newSongArray,
      sortedBy: action.sortMethod,
    }
  }
}

const songsInitialValues = {
  songsArray: undefined,
  sortedBy: "Title - Ascending",
}

function useSongSort() {
  const [state, dispatch] = useReducer(songsReducer, songsInitialValues);

  return [state, dispatch];
}



export default useSongSort;