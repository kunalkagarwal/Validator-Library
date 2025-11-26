const time = require('../../validators/time/time');

describe('Time Validator', () => {
  test('valid HH:MM times', () => {
    expect(time('00:00')).toBe(true);
    expect(time('09:05')).toBe(true);
    expect(time('23:59')).toBe(true);
    expect(time(' 23:59 ')).toBe(true); // trimmed
  });

  test('valid HH:MM:SS times', () => {
    expect(time('00:00:00')).toBe(true);
    expect(time('12:34:56')).toBe(true);
    expect(time('23:59:59')).toBe(true);
  });

  test('invalid ranges', () => {
    expect(time('24:00')).toBe(false);
    expect(time('23:60')).toBe(false);
    expect(time('23:59:60')).toBe(false);
    expect(time('99:99')).toBe(false);
    expect(time('-1:30')).toBe(false);
  });

  test('invalid formatting', () => {
    expect(time('9:30')).toBe(false);      // missing leading zero
    expect(time('09:3')).toBe(false);      // missing leading zero
    expect(time('0930')).toBe(false);      // missing colon
    expect(time('09:30:')).toBe(false);    // trailing colon
    expect(time('09::30')).toBe(false);
    expect(time('::')).toBe(false);
  });

  test('invalid characters', () => {
    expect(time('aa:bb')).toBe(false);
    expect(time('09:xx:10')).toBe(false);
  });

  test('non-string inputs', () => {
    expect(time(null)).toBe(false);
    expect(time(undefined)).toBe(false);
    expect(time(1234)).toBe(false);
    expect(time({})).toBe(false);
  });
});
