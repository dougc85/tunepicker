export default function capitalize(str) {
  return str.split(' ').map((word) => word[0].toUpperCase().concat(word.substring(1))).join(' ');
}