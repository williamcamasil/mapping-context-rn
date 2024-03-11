import encodeFileName from '.';

describe('encodeFileName ', () => {
  it('should encode file name', () => {
    const fileName = 'Test FileÂName(1)';
    const result = encodeFileName(fileName);
    expect(result).toBe('Test_File_Name_1_');
  });

});
