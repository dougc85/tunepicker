export function removeDoubleSpaces(string) {
  return string.split('').reduce((prev, char) => {
    if (char === ' ' && prev.slice(-1) === ' ') {
      return prev;
    }
    return prev.concat(char);
  }, '');
}