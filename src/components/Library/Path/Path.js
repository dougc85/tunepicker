import { React } from 'react';
import { PathStyled } from './Path.styled';
import { useNavigate, useLocation, useParams } from 'react-router-dom';

function Path(props) {

  const { pathType, heading, setId, forPicker, quickForward, disable, pathArrow } = props;

  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  const isAllSongs = (location.pathname.slice(9, 17) === 'allsongs') ? true : false;

  const divider = <p>/</p>;
  const showSecondTier = (pathType === 'Library') ?
    false :
    true;
  const showLastTier = (pathType === 'Set' || pathType === 'Song') ?
    true :
    false;
  const showExtraSetTier = (!isAllSongs && pathType === 'Song') ? true : false;

  function toLibrary() {
    navigate(`/library/`)
  }

  function toSets() {
    navigate(`/library/sets`);
  }

  function toSet() {
    if (quickForward) {
      quickForward()
      return;
    }
    let setPath =
      params.setId ? params.setId : setId;
    navigate(`/library/sets/${setPath}`)
  }

  function toAllSongs() {
    navigate(`/library/allsongs`);
  }

  function doNothing() {

  }

  function pathGenerator() {

    const libraryIcon =
      <button onClick={toLibrary}>
        <svg className="Path-icon Path-icon-library" viewBox="0 0 24 24">
          <path fill="currentColor" d="M9 3V18H12V3H9M12 5L16 18L19 17L15 4L12 5M5 5V18H8V5H5M3 19V21H21V19H3Z" />
        </svg>
      </button>

    const setsIcon =
      <button onClick={toSets}>
        <svg className="Path-icon Path-icon-book" viewBox="0 0 24 24">
          <path fill="currentColor" d="M18,22A2,2 0 0,0 20,20V4C20,2.89 19.1,2 18,2H12V9L9.5,7.5L7,9V2H6A2,2 0 0,0 4,4V20A2,2 0 0,0 6,22H18Z" />
        </svg>
      </button>

    const setIcon =
      <button onClick={pathType === 'tunesIWantToLearn' ? doNothing : toSet}>
        <svg className="Path-icon Path-icon-doc" viewBox="0 0 24 24">
          <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
        </svg>
        {pathArrow ? pathArrow : null}
      </button>;


    const allSongsIcon =
      <button onClick={toAllSongs}>
        <svg className="Path-icon Path-icon-book Path-icon-book-music" viewBox="0 0 24 24">
          <path fill="currentColor" d="M13 20.5C13 21.03 13.09 21.53 13.26 22H6C4.89 22 4 21.11 4 20V4C4 2.9 4.89 2 6 2H7V9L9.5 7.5L12 9V2H18C19.1 2 20 2.89 20 4V11H16.5V16.11C14.5 16.57 13 18.36 13 20.5M20 13H18.5V18.21C18.19 18.07 17.86 18 17.5 18C16.12 18 15 19.12 15 20.5S16.12 23 17.5 23 20 21.88 20 20.5V15H22V13H20Z" />
        </svg>
      </button>


    const songIcon =
      <svg className="Path-icon Path-icon-music" viewBox="0 0 24 24">
        <path fill="currentColor" d="M21,3V15.5A3.5,3.5 0 0,1 17.5,19A3.5,3.5 0 0,1 14,15.5A3.5,3.5 0 0,1 17.5,12C18.04,12 18.55,12.12 19,12.34V6.47L9,8.6V17.5A3.5,3.5 0 0,1 5.5,21A3.5,3.5 0 0,1 2,17.5A3.5,3.5 0 0,1 5.5,14C6.04,14 6.55,14.12 7,14.34V6L21,3Z" />
      </svg>

    const book = isAllSongs ?
      allSongsIcon :
      setsIcon;

    const singleItem = (pathType === 'Set') ?
      setIcon :
      songIcon;

    if (pathType === 'tunesIWantToLearn') {
      return (
        <PathStyled disable={disable}>
          <svg className="Path-icon" viewBox="0 0 24 24">
            <path fill="currentColor" d="M5,3C3.89,3 3,3.89 3,5V19C3,20.11 3.89,21 5,21H19C20.11,21 21,20.11 21,19V5C21,3.89 20.11,3 19,3H5M5,5H19V19H5V5M7,7V9H17V7H7M7,11V13H17V11H7M7,15V17H14V15H7Z" />
          </svg>
          <h2>{heading}</h2>
        </PathStyled>
      )
    }

    return (
      <PathStyled forPicker={forPicker} disable={disable} allowSetButton={pathArrow ? true : false}>
        {libraryIcon}
        {showSecondTier && divider}
        {showSecondTier && book}
        {showExtraSetTier && divider}
        {showExtraSetTier && setIcon}
        {showLastTier && divider}
        {showLastTier && singleItem}
        <h2>{heading}</h2>
      </PathStyled>
    )
  }
  return (
    pathGenerator()
  )
}

export default Path;