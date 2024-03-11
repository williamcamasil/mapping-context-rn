import capitalizeFirstLetter from '../capitalizeFirstLetter';

function capitalizeWordsExcept(input: string, exceptions: string[]): string {
  const words = input.split(' ');

  const capitalizedWords = words.map(word => {
    const lowerCaseWord = word.toLowerCase();
    if (exceptions.some(exception => lowerCaseWord === exception.toLowerCase())) {
      return word;
    }
    return capitalizeFirstLetter(word);

  });

  return capitalizedWords.join(' ');
}

export default capitalizeWordsExcept;
