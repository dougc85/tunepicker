import './SongEntry.scss';
import { React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function SongEntry(props) {

  const { song, setCurrentSong } = props;
  const { knowledge, createdAt, title, id } = song;
  const navigate = useNavigate();
  const params = useParams();

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  const titleCapitalized = title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');

  function handleClick() {
    setCurrentSong({ ...song });
    if (params.setId) {
      navigate(`/library/sets/${params.setId}/${id}`);
    }
    else {
      navigate(`/library/allsongs/${id}`);
    }
  }

  return (
    <div onClick={handleClick} className="SongEntry" style={{ backgroundColor: bgColor }}>
      <p className="SongEntry-title">{titleCapitalized}</p>
    </div>
  )
}

export default SongEntry;