const isISBN = require('../../validators/isbn/isbn');

describe('ISBN validator', () => {
  test('valid ISBN-13 (no separators)', () => {
    expect(isISBN('9780306406157')).toBe(true); // canonical valid ISBN-13
    expect(isISBN('9783161484100')).toBe(true);
  });

  test('valid ISBN-13 with hyphens/spaces', () => {
    expect(isISBN('978-0-306-40615-7')).toBe(true);
    expect(isISBN('978 3 16 148410 0')).toBe(true);
  });

  test('invalid ISBN-13 (wrong checksum)', () => {
    expect(isISBN('9780306406158')).toBe(false);
    expect(isISBN('9783161484101')).toBe(false);
  });

  test('valid ISBN-10 (digits)', () => {
    expect(isISBN('0306406152')).toBe(true); // classic ISBN-10 valid
    expect(isISBN('0140449116')).toBe(true);
  });

  test('valid ISBN-10 with X check digit (upper/lowercase)', () => {
    expect(isISBN('0306406152')).toBe(true);
    // Example where X is check digit
    expect(isISBN('0306406152')).toBe(true); // sanity repeat
    expect(isISBN('097522980X')).toBe(true);
    expect(isISBN('097522980x')).toBe(true);
  });

  test('ISBN-10 with separators', () => {
    expect(isISBN('0-306-40615-2')).toBe(true);
    expect(isISBN('0 306 40615 2')).toBe(true);
  });

  test('invalid ISBN-10 (bad checksum)', () => {
    expect(isISBN('0306406153')).toBe(false);
    expect(isISBN('0975229800')).toBe(false); // changed check digit
  });

  test('reject wrong lengths and invalid characters', () => {
    expect(isISBN('123456789')).toBe(false); // 9 chars
    expect(isISBN('123456789012')).toBe(false); // 12 chars
    expect(isISBN('ABCDEFGHIJ')).toBe(false);
    expect(isISBN('9780306406157abc')).toBe(false);
  });

  test('reject non-string types', () => {
    expect(isISBN(9780306406157)).toBe(false); // number type
    expect(isISBN(null)).toBe(false);
    expect(isISBN(undefined)).toBe(false);
    expect(isISBN({})).toBe(false);
  });
});
