// tests/password/password.test.js
const { validatePassword } = require('../../validators/password/password');

describe('Password validator - basic tests', () => {
  test('Valid strong password', () => {
    expect(validatePassword('Abcdef1!')).toBe(true);
  });

  test('Long valid password (within bounds)', () => {
    const p = 'A' + 'a'.repeat(30) + '1!';
    expect(validatePassword(p)).toBe(true);
  });

  test('Reject too short', () => {
    expect(validatePassword('Aa1!')).toBe(false);
  });

  test('Reject missing uppercase', () => {
    expect(validatePassword('abcdef1!')).toBe(false);
  });

  test('Reject missing lowercase', () => {
    expect(validatePassword('ABCDEF1!')).toBe(false);
  });

  test('Reject missing digit', () => {
    expect(validatePassword('Abcdefg!')).toBe(false);
  });

  test('Reject missing special character', () => {
    expect(validatePassword('Abcdefg1')).toBe(false);
  });

  test('Reject whitespace in password', () => {
    expect(validatePassword('Abc def1!')).toBe(false);
  });

  test('Reject non-string inputs', () => {
    expect(validatePassword(null)).toBe(false);
    expect(validatePassword(12345678)).toBe(false);
  });
});
