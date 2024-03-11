const capitalizeText = (str: string) => str.toLowerCase().replace(/(?:^|\s)\S/g, val => val.toUpperCase());

export default capitalizeText;
