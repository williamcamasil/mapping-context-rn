function getFirstName(fullName: string) {
  const firstName = fullName.split(' ');
  return firstName[0];
}

export default getFirstName;
