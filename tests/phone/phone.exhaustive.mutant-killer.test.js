const { validatePhone } = require('../../validators/phone/phone');

describe('Phone validator - exhaustive mutant-killer tests', () => {
  // Basic sanity (should pass)
  test('Accept proper +91 formatted with spaces/dashes', () => {
    expect(validatePhone('+91 98765-43210')).toBe(true);
  });

  // E.164 minimal for other countries (7 digits) should pass
  test('Accept minimal international +1234567', () => {
    expect(validatePhone('+1234567')).toBe(true);
  });

  // Too short (6 digits) must fail
  test('Reject too-short international +123456', () => {
    expect(validatePhone('+123456')).toBe(false);
  });

  // Max length (15 digits) should pass
  test('Accept 15-digit +123456789012345', () => {
    expect(validatePhone('+123456789012345')).toBe(true);
  });

  // Too long (16 digits) must fail
  test('Reject 16-digit +1234567890123456', () => {
    expect(validatePhone('+1234567890123456')).toBe(false);
  });

  // Country code cannot start with 0
  test('Reject country code starting with zero +0123456789', () => {
    expect(validatePhone('+0123456789')).toBe(false);
  });

  // Double plus should fail
  test('Reject double plus ++1234567', () => {
    expect(validatePhone('++1234567')).toBe(false);
  });

  // Trailing plus should fail
  test('Reject trailing plus +1234567+', () => {
    expect(validatePhone('+1234567+')).toBe(false);
  });

  // Mixed separators that shorten the number after stripping — must be rejected
  test('Reject input that becomes too short after stripping separators', () => {
    expect(validatePhone('+1 (202) 55-501')).toBe(false);
  });

  // +1 specific: valid if digitsOnly length == 11
  test('Accept +1 with exactly 11 digits (NANP)', () => {
    expect(validatePhone('+12025550143')).toBe(true); // +1 202 555 0143 as digits
  });

  // +1 with separators must be accepted when digitsOnly makes 11 digits
  test('Accept +1 with separators when digitsOnly is 11', () => {
    expect(validatePhone('+1 (202) 555-0143')).toBe(true);
  });

  // +1 with insufficient digits must be rejected even if formatted
  test('Reject +1 formatted but insufficient digits', () => {
    expect(validatePhone('+1 (202) 555-01')).toBe(false);
  });

  // National: Indian 10-digit starting with 6-9 should pass
  test('Accept Indian national 9876543210', () => {
    expect(validatePhone('9876543210')).toBe(true);
  });

  // National: leading 0 trimmed to valid Indian number
  test('Accept national with leading zero 09876543210', () => {
    expect(validatePhone('09876543210')).toBe(true);
  });

  // National: reject 10-digit all zeros
  test('Reject national ten zeros 0000000000', () => {
    expect(validatePhone('0000000000')).toBe(false);
  });

  // Reject strings with alphabetic chars embedded
  test('Reject numbers with letters 98765a3210', () => {
    expect(validatePhone('98765a3210')).toBe(false);
  });

  // Reject extension-like text (should not accept 'ext' or 'x' appended)
  test('Reject numbers with extension text +1-202-555-0143 x123', () => {
    expect(validatePhone('+1-202-555-0143 x123')).toBe(false);
  });

  // Reject Unicode digits (don't accept non-ASCII numerals)
  test('Reject unicode digits +１２３４５６７', () => {
    expect(validatePhone('+１２３４５６７')).toBe(false);
  });

  // Reject plus in the middle of string
  test('Reject plus in middle 123+4567', () => {
    expect(validatePhone('123+4567')).toBe(false);
  });

  // Leading/trailing whitespace should be tolerated for valid numbers
  test('Accept valid number with leading/trailing spaces', () => {
    expect(validatePhone('  +91 9876543210  ')).toBe(true);
  });

  // Reject inputs that contain valid digit count but country code not numeric after +
  test('Reject non-numeric country code +A1234567', () => {
    expect(validatePhone('+A1234567')).toBe(false);
  });

  // Rejection of improbable but possible mutants: accepts 0-leading country codes removed earlier
  test('Reject number with country code 0 after plus +0', () => {
    expect(validatePhone('+0')).toBe(false);
  });
});
