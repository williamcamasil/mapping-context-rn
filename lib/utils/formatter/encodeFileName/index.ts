function encodeFileName(url: string) {
  return url.replace(/[^a-z\d-_.]/gi, '_');
}

export default encodeFileName;
