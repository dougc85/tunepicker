import './SongEntry.scss';
import { React } from 'react';
import { useNavigate } from 'react-router-dom';

function SongEntry(props) {

  const { song, title, setCurrentSong } = props;
  const { knowledge, createdAt } = song;
  const navigate = useNavigate();

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  const titleCapitalized = title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');

  function handleClick() {
    setCurrentSong({ ...song, title });
    navigate(`/library/allsongs/${title}`);
  }

  return (
    <div onClick={handleClick} className="SongEntry" style={{ backgroundColor: bgColor }}>
      <p className="SongEntry-title">{titleCapitalized}</p>
    </div>
  )
}

export default SongEntry;