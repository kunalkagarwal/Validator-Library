const { validateUsername } = require('../../validators/username/username');

describe('Username validator', () => {

  test('Valid basic username', () => {
    expect(validateUsername('alice')).toBe(true);
  });

  test('Valid with digits', () => {
    expect(validateUsername('alice123')).toBe(true);
  });

  test('Valid mixed characters', () => {
    expect(validateUsername('Alice_Bob-01')).toBe(true);
  });

  test('Reject too short', () => {
    expect(validateUsername('ab')).toBe(false);
  });

  test('Reject empty input', () => {
    expect(validateUsername('')).toBe(false);
  });

  test('Reject starting with digit', () => {
    expect(validateUsername('1alice')).toBe(false);
  });

  test('Reject invalid chars', () => {
    expect(validateUsername('alice bob')).toBe(false);
  });

  test('Reject non-string', () => {
    expect(validateUsername(12345)).toBe(false);
  });
});
