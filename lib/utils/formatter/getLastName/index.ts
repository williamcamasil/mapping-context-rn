function getLastName(fullName: string) {
  const parts = fullName.split(' ');
  const lastNameParts = parts.slice(1, parts.length);
  return lastNameParts.join(' ');
}

export default getLastName;
