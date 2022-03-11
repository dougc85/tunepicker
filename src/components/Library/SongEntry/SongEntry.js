import './SongEntry.scss';
import { React } from 'react';

function SongEntry(props) {

  const { title, knowledge } = props;

  const bgColor =
    knowledge === 'know' ? 'hsl(145, 63%, 49%)' :
      knowledge === 'med' ? 'hsl(54, 98%, 66%)' :
        'hsl(26, 100%, 67%)';

  const titleCapitalized = title.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');

  return (
    <div className="SongEntry" style={{ backgroundColor: bgColor }}>
      <p className="SongEntry-title">{titleCapitalized}</p>
    </div>
  )
}

export default SongEntry;