function capitalizeFirstLetter(text: string) {
  const lowerCaseText = text.toLowerCase();
  return lowerCaseText.charAt(0).toUpperCase() + lowerCaseText.slice(1);
}

export default capitalizeFirstLetter;
