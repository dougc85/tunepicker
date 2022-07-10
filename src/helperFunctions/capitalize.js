export default function capitalize(str) {
  return str.split(' ').map((word) => {
    if (word[0].toLowerCase() !== word[0].toUpperCase()) {
      return word[0].toUpperCase().concat(word.substring(1));
    }

    if (word.length === 1) {
      return word;
    }

    return word[0].concat(capitalize(word.substring(1)))
  }
  ).join(' ');
}