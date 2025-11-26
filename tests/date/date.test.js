// tests/date/date.test.js
const { validateDate } = require('../../validators/date/date');

describe('Date validator - basic cases', () => {
  test('Accept ISO date YYYY-MM-DD', () => {
    expect(validateDate('2023-11-25')).toBe(true);
  });

  test('Accept ISO datetime with Z', () => {
    expect(validateDate('2023-11-25T13:45:30Z')).toBe(true);
  });

  test('Accept ISO datetime with offset', () => {
    expect(validateDate('2023-11-25T13:45:30+05:30')).toBe(true);
  });

  test('Accept DD-MM-YYYY', () => {
    expect(validateDate('25-11-2023')).toBe(true);
  });

  test('Accept MM/DD/YYYY', () => {
    expect(validateDate('11/25/2023')).toBe(true);
  });

  test('Reject invalid calendar date (Feb 30)', () => {
    expect(validateDate('2021-02-30')).toBe(false);
    expect(validateDate('30-02-2021')).toBe(false);
    expect(validateDate('02/30/2021')).toBe(false);
  });

  test('Reject malformed strings', () => {
    expect(validateDate('20231125')).toBe(false);
    expect(validateDate('2023/11/25')).toBe(false); // not supported in this pass
  });

  test('Reject non-string inputs', () => {
    expect(validateDate(null)).toBe(false);
    expect(validateDate(20231125)).toBe(false);
  });
});
