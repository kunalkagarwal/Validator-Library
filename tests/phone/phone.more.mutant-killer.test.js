const { validatePhone } = require('../../validators/phone/phone');

describe('Phone validator - additional mutant-killer cases', () => {
  
  // International minimum length for non-+1 countries (7 digits) should pass
  test('Accept minimal international subscriber length (7 digits)', () => {
    expect(validatePhone('+1234567')).toBe(true);
  });

  test('Reject too-short international (6 digits)', () => {
    expect(validatePhone('+123456')).toBe(false);
  });

  // +1 boundaries (now treated same as all international numbers)
  test('Accept +1 with exactly 11 digits', () => {
    expect(validatePhone('+11234567890')).toBe(true);
  });

  test('Accept +1 with 15 digits (upper bound)', () => {
    expect(validatePhone('+112345678901234')).toBe(true);
  });

  test('Reject +1 with 16 digits (too long)', () => {
    expect(validatePhone('+1123456789012345')).toBe(false);
  });

  // Invalid country code
  test('Reject country code starting with zero', () => {
    expect(validatePhone('+0123456789')).toBe(false);
  });

  // Separator-stripping must not accidentally make valid numbers
  test('Reject after stripping separators if too short', () => {
    expect(validatePhone('+1 (202) 55-501')).toBe(false);
  });

  // National format checks
  test('Accept national with leading 0 -> trims to valid Indian 10-digit', () => {
    expect(validatePhone('09876543210')).toBe(true);
  });

  test('Reject short national numbers', () => {
    expect(validatePhone('987654321')).toBe(false);
    expect(validatePhone('98765-4321')).toBe(false);
  });

  // Allow normal +91 formatting
  test('Accept +91 with parentheses and no spaces', () => {
    expect(validatePhone('+91(98765)43210')).toBe(true);
  });

  // Reject all zeros
  test('Reject ten zeros', () => {
    expect(validatePhone('0000000000')).toBe(false);
  });
});
