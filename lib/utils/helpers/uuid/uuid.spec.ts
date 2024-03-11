import uuid from '.';

jest.mock('uuid', () => ({
  v4: jest.fn(() => 'v4-uuid'),
}));

describe('uuid', () => {
  it('should return a v4 uuid', () => {
    expect(uuid.generateUUID4()).toBe('v4-uuid');
  });
});
