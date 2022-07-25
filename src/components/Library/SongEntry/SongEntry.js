import { SongEntryStyled } from './SongEntry.styled';
import { React } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import capitalize from '../../../helperFunctions/capitalize';

function SongEntry(props) {

  const { knowledge, title, id } = props.song;
  const navigate = useNavigate();
  const params = useParams();

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  function handleClick() {
    if (params.setId) {
      navigate(`/library/sets/${params.setId}/${id}`);
    }
    else {
      navigate(`/library/allsongs/${id}`);
    }
  }

  return (
    <SongEntryStyled onClick={handleClick} style={{ backgroundColor: bgColor }}>
      <p className="SongEntry-title">{capitalize(title)}</p>
    </SongEntryStyled>
  )
}

export default SongEntry;