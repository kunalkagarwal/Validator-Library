const pan = require('../../validators/pan/pan');

describe('PAN validator', () => {
  test('valid PANs (uppercase)', () => {
    expect(pan('AAAAA9999A')).toBe(true);
    expect(pan('ABCDE1234F')).toBe(true);
  });

  test('valid PANs (lowercase + trimmed)', () => {
    expect(pan('aaaaa9999a')).toBe(true);
    expect(pan('  abcde1234f  ')).toBe(true);
  });

  test('invalid lengths and characters', () => {
    expect(pan('AAAA9999A')).toBe(false);   // 4 letters then 4 digits then letter -> invalid
    expect(pan('AAAAAA999A')).toBe(false);  // 6 letters then digits -> invalid
    expect(pan('ABCDE12345')).toBe(false);  // ends with digit
    expect(pan('AB12E1234F')).toBe(false);  // letters/digits mixed incorrectly
    expect(pan('ABCDE123F')).toBe(false);   // too short
  });

  test('rejects non-strings', () => {
    expect(pan(null)).toBe(false);
    expect(pan(undefined)).toBe(false);
    expect(pan(1234567890)).toBe(false);
    expect(pan({})).toBe(false);
  });

  test('rejects extra punctuation or separators', () => {
    expect(pan('ABCDE-1234-F')).toBe(false);
    expect(pan('ABCDE 1234 F')).toBe(false);
  });

  test('edgecases: similar but invalid patterns', () => {
    expect(pan('AAAAA9999')).toBe(false);   // missing last letter
    expect(pan('99999999999')).toBe(false); // all digits
    expect(pan('ABCDEFGHIJK')).toBe(false); // all letters
  });
});
