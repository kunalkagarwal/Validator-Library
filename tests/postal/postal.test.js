const postal = require('../../validators/postal/postal');

describe('Postal (India PIN) validator', () => {
  test('valid PINs', () => {
    expect(postal('110001')).toBe(true); // New Delhi
    expect(postal('400001')).toBe(true); // Mumbai
    expect(postal('560001')).toBe(true); // Bangalore
  });

  test('trimmed input allowed', () => {
    expect(postal(' 110001 ')).toBe(true);
    expect(postal('\t400001\n')).toBe(true);
  });

  test('rejects wrong lengths or leading zero', () => {
    expect(postal('012345')).toBe(false); // leading zero not allowed
    expect(postal('12345')).toBe(false);  // 5 digits
    expect(postal('1234567')).toBe(false); // 7 digits
  });

  test('rejects non-digit characters', () => {
    expect(postal('11A001')).toBe(false);
    expect(postal('11 001')).toBe(false); // space inside
    expect(postal('11-001')).toBe(false);
  });

  test('reject non-string inputs', () => {
    expect(postal(null)).toBe(false);
    expect(postal(undefined)).toBe(false);
    expect(postal(110001)).toBe(false); // numeric type rejected (enforce string)
    expect(postal({})).toBe(false);
  });

  test('edgecases: padded zeros and similar', () => {
    expect(postal('100000')).toBe(true);
    expect(postal('900000')).toBe(true);
    expect(postal('000000')).toBe(false);
  });
});
