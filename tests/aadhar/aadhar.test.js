// tests/aadhar/aadhar.test.js
const aadhar = require('../../validators/aadhar/aadhar');

describe('Aadhaar Validator (Verhoeff) — programmatic checks', () => {
  // helper: given an 11-digit base, find the single check digit (0-9) that makes aadhar(base+digit) true.
  function findCheckDigit(base11) {
    let found = null;
    for (let d = 0; d <= 9; d++) {
      const candidate = base11 + String(d);
      if (aadhar(candidate)) {
        if (found !== null) {
          // more than one digit found — that's unexpected
          throw new Error('More than one valid check digit found for base: ' + base11);
        }
        found = d;
      }
    }
    return found;
  }

  test('programmatically find valid check digits for several bases', () => {
    const bases = [
      '00000000000',
      '12345678901',
      '11111111111',
      '98765432109',
      '31415926535'
    ];

    for (const base of bases) {
      // base must be 11 digits
      expect(base.length).toBe(11);

      const check = findCheckDigit(base);
      // There must be exactly one valid check digit for the base
      expect(check).not.toBeNull();

      const full = base + String(check);
      expect(full.length).toBe(12);
      // constructed number must validate
      expect(aadhar(full)).toBe(true);

      // small negative test: changing the last digit by +1 (mod 10) should make it invalid
      const altDigit = (check + 1) % 10;
      const alt = base + String(altDigit);
      expect(aadhar(alt)).toBe(false);
    }
  });

  test('must be exactly 12 digits', () => {
    expect(aadhar('123')).toBe(false);
    expect(aadhar('1234567890123')).toBe(false);
    expect(aadhar('')).toBe(false);
  });

  test('non-digit characters must fail', () => {
    expect(aadhar('12345A789012')).toBe(false);
    expect(aadhar('############')).toBe(false);
    expect(aadhar('１２３４５６７８９０１２')).toBe(false); // unicode digits
  });

  test('trimmed whitespace allowed', () => {
    // find a base and check digit programmatically and then add spaces
    const base = '24680135790'; // 11-digit base
    const found = (function () {
      for (let d = 0; d <= 9; d++) {
        if (aadhar(base + String(d))) return d;
      }
      return null;
    })();
    expect(found).not.toBeNull();
    expect(aadhar(' ' + base + String(found) + ' ')).toBe(true);
  });

  test('non-string inputs fail', () => {
    expect(aadhar(null)).toBe(false);
    expect(aadhar(undefined)).toBe(false);
    expect(aadhar(123456789012)).toBe(false);
    expect(aadhar({})).toBe(false);
  });
});
